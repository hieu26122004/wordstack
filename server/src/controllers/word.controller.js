import httpStatus from "http-status";
import dbProm from "../models/index.js";
import { handleAsyncError } from "../utils/async.js";
import { returnError, returnSuccess } from "../utils/formatter.js";

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

const fetchWordFromAPI = async (word, retryCount = 3) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (response.status === 429) {
      console.warn(`Too many requests for "${word}", retrying in 0.5s...`);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (retryCount > 0) {
        return await fetchWordFromAPI(word, retryCount - 1);
      } else {
        console.error(`Exceeded retry attempts for "${word}"`);
        return null;
      }
    }

    if (!response.ok) return null;

    const data = await response.json();

    if (!data || data.length === 0) return null;
    const entry = data[0];
    return entry;
  } catch (error) {
    console.log(`Failed to fetch data for word: ${word}\n`, error);
    return null;
  }
};

const processAPIData = (apiData, originalWord) => {
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

const findOrCreateRelatedWord = async (wordText, transaction) => {
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
