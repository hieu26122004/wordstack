import React from "react";
import BoLoc from "@/components/icons/BoLoc";
import Cong from "@/components/icons/Cong";
import KinhLup from "@/components/icons/KinhLup";
import MuiTenPhai from "@/components/icons/MuiTenPhai";
import MuiTenTrai from "@/components/icons/MuiTenTrai";
import WordTableRow from "../components/WordTableRow";
import { WORDS_EXAMPLES } from "@/lib/constants";

const MyStackPage = () => {
  const [expandedWords, setExpandedWords] = React.useState(new Set());

  const toggleWordExpansion = (wordId) => {
    const newExpanded = new Set(expandedWords);
    if (newExpanded.has(wordId)) {
      newExpanded.delete(wordId);
    } else {
      newExpanded.add(wordId);
    }
    setExpandedWords(newExpanded);
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          My Vocabulary
        </p>
      </div>
      <div className="flex justify-between gap-2 px-4 py-3">
        <div className="flex gap-2">
          <button className="p-2 text-white">
            <div
              className="text-white"
              data-icon="Plus"
              data-size="24px"
              data-weight="regular"
            >
              <Cong className="size-6" />
            </div>
          </button>
          <button className="p-2 text-white">
            <div
              className="text-white"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <KinhLup className="size-6" />
            </div>
          </button>
          <button className="p-2 text-white">
            <div
              className="text-white"
              data-icon="Funnel"
              data-size="24px"
              data-weight="regular"
            >
              <BoLoc className="size-6" />
            </div>
          </button>
        </div>
      </div>

      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#366347] bg-[#122118]">
          <div className="flex-1">
            {/* HEADER */}
            <div className="bg-[#1b3124] grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 px-4 py-3 text-left text-white text-sm font-medium leading-normal"></div>
              <div className="col-span-3 px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                Word
              </div>
              <div className="@[480px]:col-span-6 col-span-8 px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                Definitions
              </div>
              <div className="@[480px]:block hidden col-span-2 px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                Actions
              </div>
            </div>
            {/* BODY */}
            <div>
              {WORDS_EXAMPLES.map((word) => (
                <WordTableRow
                  key={`word-row-${word.id}-${word.word}`}
                  word={word}
                  expandedWords={expandedWords}
                  onToggleWordExpansion={toggleWordExpansion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <a href="#" className="flex size-10 items-center justify-center">
          <div
            className="text-white"
            data-icon="CaretLeft"
            data-size="20px"
            data-weight="regular"
          >
            <MuiTenTrai className="size-5" />
          </div>
        </a>
        <a
          className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#264532]"
          href="#"
        >
          1
        </a>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
          href="#"
        >
          2
        </a>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
          href="#"
        >
          3
        </a>
        <span
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
          href="#"
        >
          ...
        </span>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
          href="#"
        >
          10
        </a>
        <a href="#" className="flex size-10 items-center justify-center">
          <div
            className="text-white"
            data-icon="CaretRight"
            data-size="20px"
            data-weight="regular"
          >
            <MuiTenPhai className="size-5" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default MyStackPage;
