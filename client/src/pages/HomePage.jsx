import Duong from "@/components/icons/Duong";
import HaiToGiay from "@/components/icons/HaiToGiay";
import KinhLup from "@/components/icons/KinhLup";
import React from "react";

const HomePage = () => {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat sm:gap-8 sm:rounded-lg items-center justify-center p-4"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDraPwBkbuLvw6a2pv9u6TTpvfHh-S19eEnossuT_gndlYCG5a3FpB6Xj4NuHpCJmOE2I40G_s9BOxHlF-am62zFX9iG2vwYzDU9m59bt0LQAoIXP1PWm-0ugZWKUjcvRsAi80eyhAteZDBl_ZIt5BOF3KY7e_iZXvBHcfVsgjzwrubLDS5hQA1Nb_JR3Fdw8AnfcP4xJOGzl8Oj2Nm6z-f0XkRJq2Fuzmcq_zxEwGOFuN1a4LJxNbLc3UmkoTlqpcF1fTs5xedY8i")',
            }}
          >
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center">
              Learn English vocabulary simply, effectively, and your way.
            </h1>
            <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div
                  className="text-text-secondary flex border bg-bg-primary items-center justify-center pl-[15px] rounded-l-lg border-r-0"
                  data-icon="KinhLup"
                  data-size="20px"
                  data-weight="regular"
                >
                  <KinhLup />
                </div>
                <input
                  placeholder="Enter a word to search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-0 bg-bg-primary h-full placeholder:text-text-secondary px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal border-none"
                />
                <div className="flex items-center justify-center rounded-r-lg border-l-0 border-none bg-bg-primary pr-[7px]">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-accent-primary text-text-accent text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Search</span>
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>

        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Recently Added
        </h2>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Serendipity</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Ephemeral</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Ubiquitous</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Mellifluous</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Ineffable</p>
          </div>
        </div>

        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Features Overview
        </h2>
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4">
            <h1 className="tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              VocabMate Features
            </h1>
            <p className="text-base font-normal leading-normal max-w-[720px]">
              Explore the powerful features designed to enhance your vocabulary
              learning experience.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
            <div className="flex flex-1 gap-3 rounded-lg border border-border-primary p-4 flex-col dark:bg-[#1b2127]">
              <div data-icon="KinhLup" data-size="24px" data-weight="regular">
                <KinhLup className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold leading-tight">
                  Search and Save Words
                </h2>
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Quickly search for words and save them to your personal
                  vocabulary list.
                </p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-border-primary p-4 flex-col dark:bg-[#1b2127]">
              <div data-icon="HaiToGiay" data-size="24px" data-weight="regular">
                <HaiToGiay className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold leading-tight">
                  Review with Flashcards and Quizzes
                </h2>
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Practice and reinforce your learning with interactive
                  flashcards and quizzes.
                </p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-border-primary p-4 flex-col dark:bg-[#1b2127]">
              <div data-icon="Duong" data-size="24px" data-weight="regular">
                <Duong className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold leading-tight">
                  Personalized Learning Path
                </h2>
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Follow a personalized path tailored to your learning pace and
                  goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Why Choose VocabMate?
        </h2>
        <p className="text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
          VocabMate offers a personalized, user-friendly experience for learning
          English vocabulary. No account needed, learn anytime, anywhere.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
