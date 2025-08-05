import httpStatus from "http-status";
import dbProm from "../models/index.js";
import { handleAsyncError } from "../utils/async.js";
import {
  returnError,
  returnPagination,
  returnSuccess,
} from "../utils/formatter.js";

const db = await dbProm;
const {
  Word,
  WordDefinition,
  WordExample,
  WordSynonym,
  WordAntonym,
  sequelize,
} = db;

export const createWord = handleAsyncError(async (req, res) => {
  const { word, phonetic, pronunciationUrl, definitions } = req.body;

  const lowercasedWord = word.trim().toLowerCase();
  const exists = await Word.findOne({ where: { word: lowercasedWord } });
  if (exists) {
    return res
      .status(httpStatus.CONFLICT)
      .json(returnError("Word already exists."));
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      const newWord = await Word.create(
        {
          word: lowercasedWord,
          phonetic: phonetic || null,
          pronunciationUrl: pronunciationUrl || null,
        },
        { transaction: t }
      );

      const allDefinitions = [];

      for (const def of definitions) {
        const {
          definition,
          partOfSpeech,
          examples = [],
          synonyms = [],
          antonyms = [],
        } = def;

        const wordDef = await WordDefinition.create(
          {
            definition,
            partOfSpeech,
            wordId: newWord.id,
          },
          { transaction: t }
        );

        const exampleEntries = await Promise.all(
          examples
            .filter((e) => e.exampleText)
            .map((e) =>
              WordExample.create(
                {
                  exampleText: e.exampleText,
                  translation: e.translation || null,
                  wordDefinitionId: wordDef.id,
                },
                { transaction: t }
              )
            )
        );

        const synonymEntries = await Promise.all(
          synonyms
            .filter((s) => s.synonymyId && s.synonymyId !== wordDef.id)
            .map((s) =>
              WordSynonym.create(
                {
                  synonymyId: s.synonymyId,
                  wordId: newWord.id,
                },
                { transaction: t }
              )
            )
        );

        const antonymEntries = await Promise.all(
          antonyms
            .filter((a) => a.antonymId && a.antonymId !== wordDef.id)
            .map((a) =>
              WordAntonym.create(
                {
                  antonymId: a.antonymId,
                  wordId: newWord.id,
                },
                { transaction: t }
              )
            )
        );

        allDefinitions.push({
          ...wordDef.toJSON(),
          examples: exampleEntries.map((e) => e.toJSON()),
          synonyms: synonymEntries.map((s) => s.toJSON()),
          antonyms: antonymEntries.map((a) => a.toJSON()),
        });
      }

      return {
        ...newWord.toJSON(),
        definitions: allDefinitions,
      };
    });

    return res
      .status(httpStatus.CREATED)
      .json(returnSuccess("Word created successfully.", result));
  } catch (err) {
    console.error(`Failed during create new word: \n${err}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(returnError("Failed to create word."));
  }
});

export const bulkCreateWord = handleAsyncError(async (req, res) => {
  const { words } = req.body;

  const results = {
    totalWords: words.length,
    successCount: 0,
    skippedCount: 0,
    errorCount: 0,
    errors: [],
    processedWords: [],
  };

  for (const word of words) {
    const cleanWord = word.trim().toLowerCase();

    try {
      const existingWord = await Word.findOne({
        where: { word: cleanWord },
      });

      if (existingWord) {
        results.skippedCount++;
        results.processedWords.push({
          word,
          status: "skipped",
          reason: "Word already exists",
        });
        continue;
      }

      const apiData = await fetchWordFromAPI(word);

      if (!apiData) {
        results.errorCount++;
        results.errors.push(`No data found for word: ${cleanWord}`);
        continue;
      }

      const processedData = processAPIData(apiData, word);

      if (!processedData) {
        results.errorCount++;
        results.errors.push(`Failed to process data for word: ${cleanWord}`);
        continue;
      }

      await sequelize.transaction(async (t) => {
        const newWord = await Word.create(
          {
            word: processedData.word,
            phonetic: processedData.phonetic,
            pronunciationUrl: processedData.pronunciationUrl,
          },
          { transaction: t }
        );

        for (const defData of processedData.definitions) {
          const wordDefinition = await WordDefinition.create(
            {
              definition: defData.definition,
              partOfSpeech: defData.partOfSpeech,
              wordId: newWord.id,
            },
            { transaction: t }
          );

          if (Array.isArray(defData.examples) && defData.examples.length > 0) {
            for (const example of defData.examples) {
              await WordExample.create(
                {
                  exampleText: example.exampleText,
                  translation: example.translation,
                  wordDefinitionId: wordDefinition.id,
                },
                { transaction: t }
              );
            }
          }
        }

        if (
          Array.isArray(processedData.synonyms) &&
          processedData.synonyms.length > 0
        ) {
          for (const synonym of processedData.synonyms) {
            const synonymId = await findOrCreateRelatedWord(
              synonym.synonymText,
              t
            );
            if (!synonymId) continue;

            await WordSynonym.create(
              {
                synonymyId: synonymId,
                wordId: newWord.id,
              },
              { transaction: t }
            );
          }
        }

        if (
          Array.isArray(processedData.antonyms) &&
          processedData.antonyms.length > 0
        ) {
          for (const antonym of processedData.antonyms) {
            const antonymId = await findOrCreateRelatedWord(
              antonym.antonymText,
              t
            );
            await WordAntonym.create(
              {
                antonymId: antonymId,
                wordId: newWord.id,
              },
              { transaction: t }
            );
          }
        }
      });

      results.successCount++;
      results.processedWords.push({
        word: cleanWord,
        status: "success",
        definitionsCount: processedData.definitions.length,
      });
    } catch (error) {
      results.errorCount++;
      results.errors.push(`Error processing word "${word}": ${error.message}`);
    }
  }

  return res
    .status(httpStatus.OK)
    .json(returnSuccess("Words import completed", results));
});

export const searchWords = handleAsyncError(async (req, res) => {
  const {
    query,
    searchType = "prefix",
    limit = 20,
    offset = 0,
    partOfSpeech,
    includeRelated = false,
  } = req.query;

  if (!query || query.trim().length === 0) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(returnError("Search query is required."));
  }

  const searchQuery = query.trim().toLowerCase();
  const searchLimit = Math.min(parseInt(limit), 100);
  const searchOffset = Math.max(parseInt(offset), 0);

  let whereCondition = {};
  let definitionWhere = {};

  switch (searchType) {
    case "exact":
      whereCondition.word = searchQuery;
      break;
    case "contains":
      whereCondition.word = {
        [db.Sequelize.Op.like]: `%${searchQuery}%`,
      };
      break;
    case "prefix":
      whereCondition.word = {
        [db.Sequelize.Op.like]: `${searchQuery}%`,
      };
      break;
    default:
      whereCondition.word = {
        [db.Sequelize.Op.like]: `${searchQuery}%`,
      };
  }

  if (partOfSpeech) {
    definitionWhere.partOfSpeech = partOfSpeech;
  }

  const { count, rows } = await Word.findAndCountAll({
    where: whereCondition,
    include: [
      {
        model: WordDefinition,
        where:
          Object.keys(definitionWhere).length > 0 ? definitionWhere : undefined,
        as: "definitions",
        include: [{ model: WordExample, as: "examples", limit: 3 }],
      },
    ],
    limit: searchLimit,
    offset: searchOffset,
    order: [
      [
        db.Sequelize.literal(
          `CASE WHEN word = '${searchQuery}' THEN 0 ELSE 1 END`
        ),
      ],
      [
        db.Sequelize.literal(
          `CASE WHEN word LIKE '${searchQuery}%' THEN 0 ELSE 1 END`
        ),
      ],
      [db.Sequelize.fn("LENGTH", db.Sequelize.col("word")), "ASC"],
      ["word", "ASC"],
    ],
    distinct: true,
  });

  let synonyms;
  let antonyms;

  if (includeRelated === "true") {
    const wordIds = rows.map((word) => word.id);

    synonyms = await WordSynonym.findAll({
      where: {
        wordId: wordIds,
      },
      include: [
        {
          model: Word,
          as: "wordSynonym",
          attributes: [],
        },
      ],
      attributes: [
        "wordId",
        [
          db.Sequelize.fn(
            "STRING_AGG",
            db.Sequelize.col("wordSynonym.word"),
            ","
          ),
          "synonyms",
        ],
      ],
      group: ["wordId"],
      raw: true,
    });

    antonyms = await WordAntonym.findAll({
      where: {
        wordId: wordIds,
      },
      include: [
        {
          model: Word,
          as: "wordAntonym",
          attributes: [],
        },
      ],
      attributes: [
        "wordId",
        [
          db.Sequelize.fn(
            "STRING_AGG",
            db.Sequelize.col("wordAntonym.word"),
            ","
          ),
          "antonyms",
        ],
      ],
      group: ["wordId"],
      raw: true,
    });
  }

  const results = rows.map((word) => {
    const result = {
      id: word.id,
      word: word.word,
      phonetic: word.phonetic,
      pronunciationUrl: word.pronunciationUrl,
      createdAt: word.createdAt,
      updatedAt: word.updatedAt,
      definitions:
        word.definitions?.map((def) => ({
          id: def.id,
          definition: def.definition,
          partOfSpeech: def.partOfSpeech,
          examples:
            def.examples?.map((ex) => ({
              text: ex.exampleText,
              translation: ex.translation,
            })) || [],
        })) || [],
    };

    if (includeRelated === "true") {
      if (synonyms.find((syn) => syn.wordId === result.id)) {
        result.synonyms = synonyms
          .find((syn) => syn.wordId === result.id)
          .synonyms.split(",");
      }

      if (antonyms.find((ant) => ant.wordId === result.id)) {
        result.antonyms = antonyms
          .find((ant) => ant.wordId === result.id)
          .antonyms.split(",");
      }
    }

    return result;
  });

  return res.status(httpStatus.OK).json(
    returnPagination(
      "Search completed successfully.",
      {
        query: searchQuery,
        searchType,
        results,
      },
      { count, page: Math.floor(offset / limit) + 1, limit: searchLimit }
    )
  );
});

////////////////////////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////////////////////////

export const fetchWordFromAPI = async (word, retryCount = 3) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (response.status === 429) {
      console.warn(
        `Too many requests for "${word}", retrying in ${3000 / 1000}s...`
      );

      if (retryCount > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return await fetchWordFromAPI(word, retryCount - 1, 3000);
      } else {
        console.error(`Exceeded retry attempts for "${word}"`);
        return null;
      }
    }

    if (!response.ok) {
      console.warn(
        `Failed response for word "${word}" — Status: ${response.status}`
      );
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      console.warn(`Empty data for word "${word}"`);
      return null;
    }

    return data[0];
  } catch (error) {
    console.error(`Error fetching "${word}": ${error.message}`);
    return null;
  }
};

export const processAPIData = (apiData, originalWord) => {
  if (!apiData) return null;

  const result = {
    word: originalWord.toLowerCase(),
    phonetic: null,
    pronunciationUrl: null,
    definitions: [],
    synonyms: [],
    antonyms: [],
  };

  if (apiData.phonetic) {
    result.phonetic = apiData.phonetic;
  } else if (Array.isArray(apiData.phonetics) && apiData.phonetics.length > 0) {
    result.phonetic = apiData.phonetics.find((p) => p.text)?.text || "N/A";
  }

  if (Array.isArray(apiData.phonetics) && apiData.phonetics.length > 0) {
    result.pronunciationUrl =
      apiData.phonetics.find((p) => p.audio)?.audio || "";
  }

  if (Array.isArray(apiData.meanings) && apiData.meanings.length > 0) {
    apiData.meanings.forEach((meaning) => {
      if (
        Array.isArray(meaning.definitions) &&
        meaning.definitions.length > 0
      ) {
        meaning.definitions.forEach((definition) => {
          const definitionData = {
            definition: definition.definition,
            partOfSpeech: meaning.partOfSpeech,
            examples: [],
          };

          if (definition.example) {
            definitionData.examples.push({
              exampleText: definition.example,
              translation: null,
            });
          }

          result.definitions.push(definitionData);
        });
        if (Array.isArray(meaning.synonyms) && meaning.synonyms.length > 0) {
          const uniqueSynonyms = [...new Set(meaning.synonyms.filter(Boolean))];
          result.synonyms = uniqueSynonyms.map((synonym) => ({
            synonymText: synonym.trim().toLowerCase(),
          }));
        }

        if (Array.isArray(meaning.antonyms) && meaning.antonyms.length > 0) {
          const uniqueAntonyms = [...new Set(meaning.antonyms.filter(Boolean))];
          result.antonyms = uniqueAntonyms.map((antonym) => ({
            antonymText: antonym.trim().toLowerCase(),
          }));
        }
      }
    });
  }

  return result.definitions.length > 0 ? result : null;
};

export const findOrCreateRelatedWord = async (wordText, transaction) => {
  const cleanWord = wordText.trim().toLowerCase();

  let relatedWord = await Word.findOne({
    where: { word: cleanWord },
    transaction,
  });

  if (relatedWord) return relatedWord.id;

  const apiData = await fetchWordFromAPI(wordText);

  const processed = processAPIData(apiData, cleanWord);

  const phonetic = processed?.phonetic || "N/A";
  const pronunciationUrl = processed?.pronunciationUrl || "";

  relatedWord = await Word.create(
    {
      word: cleanWord,
      phonetic,
      pronunciationUrl,
    },
    { transaction }
  );

  return relatedWord.id;
};
