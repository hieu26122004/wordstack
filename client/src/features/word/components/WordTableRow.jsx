import Loa from "@/components/icons/Loa";
import MuiTenPhai from "@/components/icons/MuiTenPhai";
import React from "react";
import { Link } from "react-router-dom";
import { playPronunciation } from "../word.util";
import useSavedWords from "../hooks/useSavedWords";

const WordTableRow = ({
  word,
  onToggleWordExpansion,
  expandedWords,
  onWordClick,
}) => {
  const { actions } = useSavedWords();
  const isExpanded = expandedWords.has(word.id);

  const handleToggle = () => {
    onToggleWordExpansion(word.id);
  };

  const handleSaveToggle = async () => {
    await actions.toggleSaveWord(word);
  };

  return (
    <div className="border-b border-b-[#366347] last:border-b-0">
      {/* THÔNG TIN CƠ BẢN */}
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* NÚT XEM CHI TIẾT */}
        <div className="col-span-1 px-4 py-3">
          <button
            className="size-6 p-1 rounded-lg transition-colors duration-300 text-[#96c5a8]"
            onClick={handleToggle}
          >
            <div data-icon="Cong" data-size="24px" data-weight="regular">
              <MuiTenPhai
                className={`size-4 transition-transform duration-300 ${
                  isExpanded ? "-rotate-90" : "rotate-90"
                }`}
              />
            </div>
          </button>
        </div>
        {/* THÔNG TIN CƠ BẢN */}
        <div className="col-span-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-normal leading-normal">
              {word.word}
            </span>
            {word.pronunciationUrl && (
              <button
                onClick={() => playPronunciation(word)}
                className="p-1 h-6 w-6 hover:bg-bg-secondary rounded-lg transition-colors duration-300 opacity-60 hover:opacity-100 inline-flex items-center justify-center text-[#96c5a8]"
                title={`Pronounce ${word.word}`}
              >
                <div data-icon="Loa" data-size="16px" data-weight="regular">
                  <Loa className={`size-4`} />
                </div>
              </button>
            )}
          </div>
          {word.phonetic && (
            <div className="text-[#96c5a8] text-sm mt-1">{word.phonetic}</div>
          )}
        </div>
        {/* SỐ LƯỢNG ĐỊNH NGHĨA */}
        <div className="@[480px]:col-span-6 col-span-8 px-4 py-3">
          <div className="text-[#96c5a8] text-sm font-normal leading-normal">
            {Array.isArray(word.definitions) && word.definitions.length} meaning
            {Array.isArray(word.definitions) && word.definitions.length > 1
              ? "s"
              : ""}{" "}
            available
          </div>
        </div>
        {/* CÁC HÀNH ĐỘNG */}
        <div className="@[480px]:block hidden col-span-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToggle}
              className={`size-7 p-1 rounded-full transition-colors duration-300 flex items-center justify-center ${
                word.isSaved
                  ? "text-[#96c5a8] bg-[#264532] hover:bg-[#366347]"
                  : "text-[#96c5a8] bg-[#264532] hover:bg-[#366347]"
              }`}
              title={word.isSaved ? "Unsave word" : "Save word"}
            >
              {word.isSaved ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                >
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                >
                  <path
                    fill="currentColor"
                    d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                  ></path>
                </svg>
              )}
            </button>
            <button className="size-7 p-1 rounded-full transition-colors duration-300 flex items-center justify-center text-[#96c5a8] bg-[#264532] hover:bg-[#366347]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* CHI TIẾT */}
      {isExpanded && (
        <div className="border-t border-t-[#366347]">
          {Array.isArray(word.definitions) &&
            word.definitions.length > 0 &&
            word.definitions.map((definition, index) => (
              <div
                key={`row-definition-${definition.id}`}
                className="px-4 py-3 ml-4 border-l-2 border-[#366347]"
              >
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* STT */}
                  <div className="col-span-1">
                    <span className="text-[#96c5a8] text-sm font-normal leading-normal">
                      {index + 1}.
                    </span>
                  </div>
                  {/* LOẠI TỪ */}
                  <div className="col-span-3 -ml-4">
                    <span className="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs w-fit bg-[#264532] whitespace-nowrap overflow-hidden text-white">
                      {definition.partOfSpeech}
                    </span>
                  </div>
                  {/* ĐỊNH NGHĨA + VÍ DỤ */}
                  <div className="@[480px]:col-span-6 col-span-8">
                    <p className="text-[#96c5a8] text-sm font-normal leading-normal capitalize mb-2">
                      {definition.definition}
                    </p>
                    {Array.isArray(definition.examples) &&
                      definition.examples.length > 0 &&
                      definition.examples.map((example) => (
                        <>
                          <p
                            key={`row-example-${example.id}`}
                            className="text-[#96c5a8] text-xs font-normal leading-normal capitalize italic"
                          >
                            {example.text}
                          </p>
                        </>
                      ))}
                  </div>
                  {/* ĐỒNG NGHĨA + TRÁI NGHĨA */}
                  <div className="@[480px]:flex justify-end hidden col-span-2">
                    {Array.isArray(word.synonyms) &&
                      word.synonyms.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {word.synonyms.map((synonym, index) => (
                              <span
                                onClick={() =>
                                  onWordClick && onWordClick(synonym)
                                }
                                key={`word-${word.id}-synonym-index-${index}`}
                                className="inline-flex items-center justify-center px-2 py-1 text-xs w-fit bg-[#264532] text-white rounded-md cursor-pointer hover:bg-[#366347] transition-colors whitespace-nowrap overflow-hidden"
                              >
                                {synonym}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {Array.isArray(word.antonyms) &&
                      word.antonyms.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {word.antonyms.map((antonym, index) => (
                              <span
                                onClick={() =>
                                  onWordClick && onWordClick(antonym)
                                }
                                key={`word-${word.id}-antonym-index-${index}`}
                                className="px-2 py-1 bg-[#4a2626] text-white text-sm rounded-md cursor-pointer hover:bg-[#5a3232] transition-colors"
                              >
                                {antonym}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default WordTableRow;
