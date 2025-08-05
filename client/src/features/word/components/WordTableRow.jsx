import Loa from "@/components/icons/Loa";
import MuiTenPhai from "@/components/icons/MuiTenPhai";
import React from "react";
import { Link } from "react-router-dom";

const WordTableRow = ({ word, onToggleWordExpansion, expandedWords }) => {
  const isExpanding = expandedWords.has(word.id);

  return (
    <div className="border-b border-b-[#366347] last:border-b-0">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-1 px-4 py-3">
          <button
            className="size-6 p-1 rounded-lg transition-colors duration-300 text-[#96c5a8]"
            onClick={() => onToggleWordExpansion(word.id)}
          >
            <div data-icon="Cong" data-size="24px" data-weight="regular">
              <MuiTenPhai
                className={`size-4 transition-transform duration-300 ${
                  isExpanding ? "-rotate-90" : "rotate-90"
                }`}
              />
            </div>
          </button>
        </div>
        <div className="col-span-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-normal leading-normal">
              {word.word}
            </span>
            <button
              className="p-1 h-6 w-6 hover:bg-bg-secondary rounded-lg transition-colors duration-300 opacity-60 hover:opacity-100 inline-flex items-center justify-center text-[#96c5a8]"
              title={`Pronounce ${word.word}`}
            >
              <div data-icon="Loa" data-size="16px" data-weight="regular">
                <Loa className={`size-4`} />
              </div>
            </button>
          </div>
          {word.phonetic && (
            <div className="text-[#96c5a8] text-sm mt-1">{word.phonetic}</div>
          )}
        </div>
        <div className="@[480px]:col-span-6 col-span-8 px-4 py-3">
          <div className="text-[#96c5a8] text-sm font-normal leading-normal">
            {word.definitions.length} meaning
            {word.definitions.length > 1 ? "s" : ""} available
          </div>
        </div>
        <div className="@[480px]:block hidden col-span-2 px-4 py-3">
          <div className="text-[#96c5a8] text-sm font-bold leading-normal tracking-[0.015em]">
            <Link className="hover:underline" to="#">
              Edit
            </Link>{" "}
            |{" "}
            <Link className="hover:underline" to="#">
              Delete
            </Link>{" "}
            |{" "}
            <Link className="hover:underline" to="#">
              Review
            </Link>
          </div>
        </div>
      </div>
      {isExpanding && (
        <div className="border-t border-t-[#366347]">
          {word.definitions.map((definition, index) => (
            <div
              key={`row-definition-${definition.id}`}
              className="px-4 py-3 ml-4 border-l-2 border-[#366347]"
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-1">
                  <span className="text-[#96c5a8] text-sm font-normal leading-normal">
                    {index + 1}.
                  </span>
                </div>
                <div className="col-span-3 -ml-4">
                  <span className="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs w-fit bg-[#264532] whitespace-nowrap overflow-hidden text-white">
                    {definition.partOfSpeech}
                  </span>
                </div>
                <div className="col-span-6">
                  <p className="text-[#96c5a8] text-sm font-normal leading-normal capitalize mb-2">
                    {definition.definition}
                  </p>
                  {Array.isArray(definition.examples) &&
                    definition.examples.length > 0 &&
                    definition.examples.map((example) => (
                      <p
                        key={`row-example-${example.id}`}
                        className="text-[#96c5a8] text-xs font-normal leading-normal capitalize italic"
                      >
                        {example.exampleText}
                      </p>
                    ))}
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
