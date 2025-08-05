import MuiTenPhai from "@/components/icons/MuiTenPhai";
import React from "react";

const WordItem = ({ word, onToggleWordExpansion, expandedWords }) => {
  const isExpanded = expandedWords.has(word.id);

  const handleToggle = () => {
    onToggleWordExpansion(word.id);
  };

  return (
    <div className="px-4 mb-4">
      <div className="flex flex-col gap-4 px-4 rounded-lg bg-[#1a2e20] ">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-3 my-2">
              <p className="text-white text-base font-medium leading-normal my-2">
                {word.word}
              </p>
              {word.pronunciationUrl && (
                <button
                  className="size-6 p-1 rounded-full transition-colors duration-300 text-[#96c5a8] hover:bg-[#264532] flex items-center justify-center mt-1"
                  title="Phát âm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55ZM208,128a39.93,39.93,0,0,1-10,26.46,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58A40,40,0,0,1,208,128Z"></path>
                  </svg>
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] px-2">
                <p className="text-white text-sm font-normal leading-normal -mt-[2px]">
                  noun
                </p>
              </div>
              <p className="text-[#96c5a8] text-sm font-normal leading-normal">
                {word.phonetic}
              </p>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={handleToggle}
              className="size-7 p-1 rounded-full transition-colors duration-300 text-[#96c5a8] bg-[#264532] flex items-center justify-center"
            >
              <div
                data-icon="MuiTenPhai"
                data-size="24px"
                data-weight="regular"
              >
                <MuiTenPhai
                  className={`transition-transform duration-300 ${
                    isExpanded ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[9000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 border-t border-[#366347]">
            {Array.isArray(word.definitions) && word.definitions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[#96c5a8] text-sm font-semibold mb-2">
                  Definition:
                </h4>
                <div className="space-y-3">
                  {word.definitions.map((definition, index) => (
                    <div key={definition.id} className="pl-3">
                      <div className="flex items-start gap-2">
                        <span className="text-[#96c5a8] text-sm mt-1">
                          {index + 1}.
                        </span>
                        <div className="flex-1">
                          <p className="text-[#96c5a8] text-sm leading-relaxed mt-[3px]">
                            {definition.definition}
                          </p>
                          {definition.examples.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {definition.examples.map((example) => (
                                <div
                                  key={example.id}
                                  className="pl-4 border-l-2 border-[#264532]"
                                >
                                  <p className="text-[#96c5a8] text-sm italic">
                                    "{example.exampleText}"
                                  </p>
                                  {example.translation && (
                                    <p className="text-[#7a9b85] text-xs mt-1">
                                      {example.translation}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(word.synonyms) && word.synonyms.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[#96c5a8] text-sm font-semibold mb-2">
                  Từ đồng nghĩa:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.map((synonym) => (
                    <span
                      key={synonym.id}
                      className="px-2 py-1 bg-[#264532] text-white text-sm rounded-md"
                    >
                      Fuck
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(word.antonyms) && word.antonyms.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[#96c5a8] text-sm font-semibold mb-2">
                  Từ trái nghĩa:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {word.antonyms.map((antonym) => (
                    <span
                      key={antonym.id}
                      className="px-2 py-1 bg-[#4a2626] text-white text-sm rounded-md"
                    >
                      Bitch
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-[#7a9b85] pt-2 pb-4 border-t border-[#264532]">
              <p>
                Thêm vào: {new Date(word.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordItem;
