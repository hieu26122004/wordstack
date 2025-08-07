import React from "react";
import Duong from "@/components/icons/Duong";
import HaiToGiay from "@/components/icons/HaiToGiay";
import KinhLup from "@/components/icons/KinhLup";
import { useNavigate } from "react-router-dom";
import { paths } from "@/lib/constants";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(paths.stack);
    }
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDP67ooYIjWMw1KS5Y_2i8nm3S4MwYLpEUEaBd7oCMt5cDRTznfUTB3qBvCn4jrIhVEDpjUJiJ_vZBhrRjN-kpDQcPUlWIYWGldCEavPti_MDgAbQiWPausm-aHyqKmMRFzGolNVOHa-QtmA0rzRUhN62u9iYdmfbR-V_qaouHs6F_y_RfPaE0Ygk_up4hbqoHQCjs-XJSiFfD2Ss9g39jsBN27cdvd4xgEtSbnACl8RFC-a9qb4qAFnIx8ALngtx7R-YCFFLkeHX8")`,
            }}
          >
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center">
              Learn English vocabulary simply, effectively, and your way.
            </h1>
            <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div
                  className="text-[#96c5a8] flex border border-[#366347] bg-[#1b3124] items-center justify-center pl-[15px] rounded-l-lg border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="20px"
                  data-weight="regular"
                >
                  <KinhLup className="size-5" />
                </div>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter a word to look up"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#366347] bg-[#1b3124] focus:border-[#366347] h-full placeholder:text-[#96c5a8] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                />
                <div className="flex items-center justify-center rounded-r-lg border-l-0 border border-[#366347] bg-[#1b3124] pr-[7px]">
                  <button
                    onClick={handleSearch}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#39e079] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                  >
                    <span className="truncate">Find Meaning</span>
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">Fuck</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">
            New Words
          </p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">
            Phrases
          </p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">
            Idioms
          </p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-4">
          <p className="text-white text-sm font-medium leading-normal">Slang</p>
        </div>
      </div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Key Features
      </h2>
      <div className="flex flex-col gap-10 px-4 py-10 @container">
        <div className="flex flex-col gap-4">
          <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
            WordStack: Your Personalized Vocabulary Learning Journey
          </h1>
          <p className="text-white text-base font-normal leading-normal max-w-[720px]">
            Discover the power of tailored learning with WordStack. Our platform
            adapts to your pace and style, ensuring effective and enjoyable
            vocabulary acquisition.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
          <div className="flex flex-1 gap-3 rounded-lg border border-[#366347] bg-[#1b3124] p-4 flex-col">
            <div
              className="text-white"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <KinhLup className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-base font-bold leading-tight">
                Look up and Save Words
              </h2>
              <p className="text-[#96c5a8] text-sm font-normal leading-normal">
                Quickly find definitions, examples, and pronunciations for any
                word. Save words to your personal list for later review.
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-3 rounded-lg border border-[#366347] bg-[#1b3124] p-4 flex-col">
            <div
              className="text-white"
              data-icon="Cards"
              data-size="24px"
              data-weight="regular"
            >
              <HaiToGiay className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-base font-bold leading-tight">
                Review with Flashcards and Quizzes
              </h2>
              <p className="text-[#96c5a8] text-sm font-normal leading-normal">
                Engage with interactive flashcards and quizzes to reinforce your
                understanding and retention of new vocabulary.
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-3 rounded-lg border border-[#366347] bg-[#1b3124] p-4 flex-col">
            <div
              className="text-white"
              data-icon="RoadHorizon"
              data-size="24px"
              data-weight="regular"
            >
              <Duong className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-base font-bold leading-tight">
                Personalized Learning Path
              </h2>
              <p className="text-[#96c5a8] text-sm font-normal leading-normal">
                Follow a customized learning path that adjusts to your progress,
                focusing on words you need to learn most.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Why Choose WordStack?
      </h2>
      <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
        WordStack offers a personalized, user-friendly experience for learning
        English vocabulary. No account needed, learn anytime, anywhere.
      </p>
    </div>
  );
};

export default HomePage;
