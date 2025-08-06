import React from "react";
import KinhLup from "@/components/icons/KinhLup";
import ArrowRightIcon from "@/components/icons/MuiTenPhai";
import ArrowLeftIcon from "@/components/icons/MuiTenTrai";
import WordTableRow from "../components/WordTableRow";
import useWords from "../hooks/useWords";
import { getPageNumbers } from "../word.util";
import Select from "@/components/Select";

const MyStackPage = () => {
  const [expandedWords, setExpandedWords] = React.useState(new Set());
  const { words, loading, error, pagination, actions, params } = useWords();

  const toggleWordExpansion = (wordId) => {
    const newExpanded = new Set(expandedWords);
    if (newExpanded.has(wordId)) {
      newExpanded.delete(wordId);
    } else {
      newExpanded.add(wordId);
    }
    setExpandedWords(newExpanded);
  };

  const pages = getPageNumbers(pagination.totalPages, pagination.currentPage);

  const handleWordClick = (wordText) => {
    actions.handleSearch(wordText);
  };

  if (error) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <p className="mb-4 text-white">Error loading words: {error}</p>
            <button
              onClick={actions.refetch}
              className="mx-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#39e079] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Reload</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          My Vocabulary
        </p>
      </div>
      {/* TÌM KIẾM */}
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="relative flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#96c5a8] flex border-none bg-[#264532] items-center justify-center pl-4 rounded-l-lg border-r-0">
              <KinhLup />
            </div>
            <input
              placeholder="Search in your list"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#264532] focus:border-none h-full placeholder:text-[#96c5a8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={params.search}
              onChange={(e) => actions.handleSearch(e.target.value)}
              disabled={loading}
            />
            {params.search && (
              <button
                onClick={() => actions.handleSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#96c5a8] hover:text-white"
                type="button"
              >
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
              </button>
            )}
          </div>
        </label>
      </div>
      {/* BỘ LỌC */}
      <div className="flex gap-3 p-4 flex-wrap">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">
            Sort by: Order
          </p>
        </div>

        <Select
          options={[
            { value: "prefix", label: "Starts with" },
            { value: "exact", label: "Exact match" },
            { value: "contains", label: "Contains" },
          ]}
          value={params.searchType}
          onChange={(value) => actions.handleSearchTypeChange(value)}
          className="h-8 py-0"
          placeholder="Search type"
        />

        <Select
          options={[
            { value: "saved", label: "Saved" },
            { value: "unsaved", label: "Unsaved" },
            { value: "all", label: "All" },
          ]}
          value={params.savedStatus}
          onChange={(value) => actions.handleSavedStatusChange(value)}
          className="h-8 py-0"
          placeholder="Saved Status"
        />
      </div>
      {/* BẢNG KẾT QUẢ */}
      <div className="px-4 py-3 @container">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#39e079] mx-auto mb-4"></div>
              <p className="text-white">Searching...</p>
            </div>
          </div>
        ) : Array.isArray(words) && words.length > 0 ? (
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
                {words.map((word) => (
                  <WordTableRow
                    key={`word-row-${word.id}-${word.word}`}
                    word={word}
                    expandedWords={expandedWords}
                    onToggleWordExpansion={toggleWordExpansion}
                    onWordClick={handleWordClick}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-4 py-6">
            <div className="flex flex-col items-center gap-6">
              <div
                className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg w-full max-w-[360px]"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuCFPdXiiNylXyfnLs29aACWEWGlCcJ5JT8nkUyckzf9FJ-sa3pD8ulzDfdjr1ia19UzkSo0DoiG7lu5wy-lPZzFaQnoQ7Mvm3svbaf-nCGn86uMr4Hc4wAFUI3VYyQO5lSWkzihPeU8oUHo4IR1cGt0iXi1CZ8-SMFWzKPUIo7US6DLF2RPXEW3L4H5dNWIey-X2eixNEAkQvSrRpXwwE7rm80QVXWtYhyHDH6FEpOlb_PW0eTCfWHx6tP-ocygPKWwhHu5AusDc")`,
                }}
              ></div>
              <div className="flex max-w-[480px] flex-col items-center gap-2">
                <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                  {params.search ? "No results found" : "Start searching"}
                </p>
                <p className="text-white text-sm font-normal leading-normal max-w-[480px] text-center">
                  {params.search
                    ? `No matches for "${params.search}" in the database.`
                    : "Enter a word to view its definition, examples, and synonyms."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* PHÂN TRANG */}
      {Array.isArray(pages) && pages.length > 1 && (
        <div className="flex items-center justify-center p-4">
          <button
            disabled={!pagination.hasPreviousPage}
            onClick={actions.prevPage}
            className="flex size-10 items-center justify-center disabled:cursor-not-allowed text-white"
          >
            <ArrowLeftIcon className="size-5" />
          </button>
          {pages.map((page) => {
            if (page === pagination.currentPage) {
              return (
                <button
                  key={`search-word-page-${page}`}
                  className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#2a4133]"
                >
                  {page}
                </button>
              );
            } else if (page === "...") {
              return (
                <span
                  key={`ellipsis-${page}-${pagination.currentPage}`}
                  className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
                  href="#"
                >
                  ...
                </span>
              );
            } else {
              return (
                <button
                  key={`search-word-page-${page}`}
                  className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
                  onClick={() => actions.gotoPage(page)}
                >
                  {page}
                </button>
              );
            }
          })}

          <button
            disabled={!pagination.hasNextPage}
            onClick={actions.nextPage}
            className="flex size-10 items-center justify-center disabled:cursor-not-allowed text-white"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyStackPage;
