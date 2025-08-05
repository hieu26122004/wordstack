import React from "react";
import WordItem from "../components/WordItem";
import { WORDS_EXAMPLES } from "@/lib/constants";

const SearchPage = () => {
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
          Danh sách từ của bạn
        </p>
      </div>
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div
              className="text-[#96c5a8] flex border-none bg-[#264532] items-center justify-center pl-4 rounded-l-lg border-r-0"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Tìm kiếm trong danh sách"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#264532] focus:border-none h-full placeholder:text-[#96c5a8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value=""
            />
          </div>
        </label>
      </div>
      <div className="flex gap-3 p-4 flex-wrap">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">
            Sắp xếp theo: Thứ tự
          </p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">
            Ngày thêm
          </p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">
            Độ khó
          </p>
        </div>
      </div>

      {Array.isArray(WORDS_EXAMPLES) &&
        WORDS_EXAMPLES.length > 0 &&
        WORDS_EXAMPLES.map((word) => (
          <WordItem
            key={`word-item-${word.id}`}
            word={word}
            expandedWords={expandedWords}
            onToggleWordExpansion={toggleWordExpansion}
          />
        ))}
    </div>
  );
};

export default SearchPage;
