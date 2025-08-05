import React from "react";
import { TabContent, Tabs, TabsList, TabTrigger } from "@/components/Tabs";
import FlashCard from "../components/FlashCard";

const LearnPage = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
              Review
            </p>
            <p className="text-[#96c5a8] text-sm font-normal leading-normal">
              Strengthen your vocabulary with personalized review tools.
            </p>
          </div>
        </div>
        <Tabs defaultValue="flashcard" className="w-full">
          <TabsList>
            <TabTrigger value="flashcard">Flashcards</TabTrigger>
            <TabTrigger value="quiz"> Quiz</TabTrigger>
          </TabsList>
          <TabContent value="flashcard" className="px-0">
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Review Settings (Optional)
            </h3>
            <div className="@container">
              <div className="relative flex w-full flex-col items-start justify-between gap-3 p-4 @[480px]:flex-row @[480px]:items-center">
                <div className="flex w-full shrink-[3] items-center justify-between">
                  <p className="text-white text-base font-medium leading-normal">
                    Number of words per session
                  </p>
                  <p className="text-white text-sm font-normal leading-normal @[480px]:hidden">
                    20
                  </p>
                </div>
                <div className="flex h-4 w-full items-center gap-4">
                  <div className="flex h-1 flex-1 rounded-sm bg-[#366347]">
                    <div className="h-full w-[32%] rounded-sm bg-[#39e079]"></div>
                    <div className="relative">
                      <div className="absolute -left-2 -top-1.5 size-4 rounded-full bg-[#39e079]"></div>
                    </div>
                  </div>
                  <p className="text-white text-sm font-normal leading-normal hidden @[480px]:block">
                    20
                  </p>
                </div>
              </div>
            </div>
            <FlashCard />

            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#264532] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Previous</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#39e079] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Next</span>
                </button>
              </div>
            </div>
          </TabContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearnPage;
