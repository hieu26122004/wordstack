import React from "react";
import Loa from "@/components/icons/Loa";
import { WORDS_EXAMPLES } from "@/lib/constants";

const FlashCard = () => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className="w-full h-[50vh] [perspective:600rem] px-4">
      <div
        className={`relative w-full h-full transition duration-500 [transform-style:preserve-3d] ${
          flipped && "[transform:rotateY(180deg)]"
        }`}
      >
        {/* Front */}
        <div className="bg-[#1e3a2a] absolute inset-0 size-full [backface-visibility:hidden] rounded-lg p-6">
          <div className="h-[70px] mb-8">
            <div className="flex items-center mb-4">
              <p className="text-2xl text-white font-bold leading-tight tracking-[-0.015em] mr-4">
                Vocabulary Word
              </p>
              <button className="size-7 mt-0.5 text-[#96c5a8]">
                <div data-icon="Loa" data-size="16px" data-weight="regular">
                  <Loa className={`size-6`} />
                </div>
              </button>
            </div>

            <div className="flex items-center">
              <span className="bg-[#264532] text-white px-3 py-1 pt-0 rounded-md text-sm">
                noun
              </span>
              <span className="text-[#96c5a8] text-sm font-normal leading-normal ml-4">
                /[kriːˈeɪʃn]/
              </span>
            </div>
          </div>

          <div
            className="rounded-xl flex items-center justify-center cursor-pointer bg-[#1b3124]"
            style={{ height: "calc(50vh - 3rem - 70px - 2rem" }}
            onClick={() => {
              setFlipped(!flipped);
            }}
          >
            <p className="text-white font-medium">Click or tap to flip card</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="bg-[#1e3a2a] absolute inset-0 size-full [backface-visibility:hidden] rounded-lg [transform:rotateY(180deg)] p-6"
          onClick={() => {
            setFlipped(!flipped);
          }}
        >
          <div className="size-full overflow-y-auto space-y-4 text-[#96c5a8]">
            <div>
              <span className="text-sm">Syllables:</span>
              <span className="text-sm ml-2">2</span>
            </div>

            <div className="p-6 rounded-lg bg-[#1b3124]">
              <div className="flex items-baseline mb-6">
                <h2 className="text-lg font-semibold mr-2">noun</h2>
                <span className="text-sm ">(plural)</span>
              </div>

              <ol className="text-sm list-decimal list-inside space-y-4">
                <li>Something or someone which creates or makes something.</li>
                <li>
                  (social media) Ellipsis of content creator, someone who
                  regularly produces and publishes content on social media,
                  especially of a monetizable nature.
                </li>
                <li>
                  (sometimes capitalized) The deity that created the world.
                </li>
              </ol>

              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <span className="text-sm mr-4 w-20">Synonyms</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      founders
                    </span>
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      authors
                    </span>
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      inventors
                    </span>
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      makers
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-sm mr-4 w-20 text-[#96c5a8]">
                    Antonyms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      students
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#366347]">
                <span className="text-sm">Examples</span>
                <ol className="list-decimal list-inside mt-4 italic space-y-2 text-sm">
                  <li>Kenneth E. Iverson was the creator of APL.</li>
                  <li>creator economy</li>
                </ol>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#1b3124]">
              <div className="flex items-baseline mb-6">
                <h2 className="text-lg font-semibold mr-2">noun</h2>
                <span className="text-sm ">(plural)</span>
              </div>

              <ol className="text-sm list-decimal list-inside space-y-4">
                <li>Something or someone which creates or makes something.</li>
                <li>
                  (social media) Ellipsis of content creator, someone who
                  regularly produces and publishes content on social media,
                  especially of a monetizable nature.
                </li>
                <li>
                  (sometimes capitalized) The deity that created the world.
                </li>
              </ol>

              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <span className="text-sm mr-4 w-20">Synonyms</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      founders
                    </span>
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      authors
                    </span>
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      inventors
                    </span>
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      makers
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-sm mr-4 w-20 text-[#96c5a8]">
                    Antonyms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#264532] px-3 py-1 rounded-md text-xs">
                      students
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#366347]">
                <span className="text-sm">Examples</span>
                <ol className="list-decimal list-inside mt-4 italic space-y-2 text-sm">
                  <li>Kenneth E. Iverson was the creator of APL.</li>
                  <li>creator economy</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
