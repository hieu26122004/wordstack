import React from "react";
import LogoIcon from "@/components/LogoIcon";
import KinhLup from "@/components/icons/KinhLup";
import FacebookSmall from "@/components/icons/FacebookSmall";
import TwitterSmall from "@/components/icons/TwitterSmall";
import InstagramSmall from "@/components/icons/InstagramSmall";
import { Link, Outlet } from "react-router-dom";
import {
  APP_NAME,
  FOOTER_NAV_LINKs,
  HEADER_NAV_LINKs,
  paths,
} from "@/lib/constants";

const AppLayout = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#122118] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#264532] px-10 py-3">
          <div className="flex items-center gap-8">
            <Link to={paths.home}>
              <div className="flex items-center gap-4 text-white">
                <div className="size-5">
                  <LogoIcon className="size-5" />
                </div>
                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                  WordStack
                </h2>
              </div>
            </Link>
            <div className="flex items-center gap-9">
              {HEADER_NAV_LINKs.map((nav) => (
                <Link
                  key={`header-nav-link-${nav.id}`}
                  className="text-white text-sm font-medium leading-normal"
                  to={nav.url}
                >
                  {nav.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div
                  className="text-[#96c5a8] flex border-none bg-[#264532] items-center justify-center pl-4 rounded-l-lg border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <KinhLup className="size-6" />
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#264532] focus:border-none h-full placeholder:text-[#96c5a8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                />
              </div>
            </label>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#39e079] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Log In / Sign Up</span>
            </button>
          </div>
        </header>
        <main className="px-40 flex flex-1 justify-center py-5">
          <Outlet />
        </main>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                {FOOTER_NAV_LINKs.map((nav) => (
                  <Link
                    key={`footer-nav-link-${nav.id}`}
                    to={nav.url}
                    className="text-[#96c5a8] text-base font-normal leading-normal min-w-40"
                  >
                    {nav.text}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#">
                  <div
                    className="text-[#96c5a8]"
                    data-icon="TwitterLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <TwitterSmall className="size-6" />
                  </div>
                </a>
                <a href="#">
                  <div
                    className="text-[#96c5a8]"
                    data-icon="FacebookLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <FacebookSmall className="size-6" />
                  </div>
                </a>
                <a href="#">
                  <div
                    className="text-[#96c5a8]"
                    data-icon="InstagramLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <InstagramSmall />
                  </div>
                </a>
              </div>
              <p className="text-[#96c5a8] text-base font-normal leading-normal">
                @2024 VocabMate. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
