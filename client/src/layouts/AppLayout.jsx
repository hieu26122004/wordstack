import React from "react";
import { Link, Outlet } from "react-router-dom";
import LogoIcon from "@/components/LogoIcon";
import {
  APP_NAME,
  FOOTER_NAV_LINKs,
  HEADER_NAV_LINKs,
  paths,
} from "@/lib/constants";

const AppLayout = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-secondary px-10 py-3">
          <div className="flex items-center gap-4">
            <Link to={paths.home}>
              <LogoIcon className="size-4" />
            </Link>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              {APP_NAME}
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {HEADER_NAV_LINKs.map((link) => (
                <Link
                  key={link.id}
                  to={link.url}
                  className="text-sm font-medium leading-normal"
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-accent-primary text-text-accent text-sm font-bold leading-normal tracking-[0.015em] truncate">
              Login / Register
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
                {FOOTER_NAV_LINKs.map((link) => (
                  <Link
                    key={link.id}
                    to={link.url}
                    className="text-text-secondary text-base font-normal leading-normal min-w-40"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
              <p className="text-text-secondary text-base font-normal leading-normal">
                © 2024 VocabMate. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
