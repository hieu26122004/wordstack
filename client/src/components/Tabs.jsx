import React from "react";
import TabProvider, { useTab } from "./providers/TabProvider";
import { twMerge } from "tailwind-merge";

export const TabsList = ({ className, ...rest }) => {
  return (
    <div
      {...rest}
      className={twMerge(
        "flex border-b border-[#366347] px-4 gap-8 overflow-x-auto",
        className
      )}
    />
  );
};

export const TabTrigger = ({ value, children, className, ...rest }) => {
  const { currentTab, onChangeTab } = useTab();

  return (
    <button
      {...rest}
      onClick={() => onChangeTab(value)}
      className={twMerge(
        "flex flex-col items-center justify-center pb-[13px] pt-4 cursor-pointer",
        currentTab === value ? "border-b-[3px] border-b-[#39e079]" : "",
        className
      )}
      aria-selected={currentTab === value}
      role="tab"
    >
      <p
        className={`text-sm font-bold leading-normal tracking-[0.015em] ${
          currentTab === value ? "text-white" : "text-[#96c5a8]"
        }`}
      >
        {children}
      </p>
    </button>
  );
};

export const TabContent = ({ value, children, className, ...rest }) => {
  const { currentTab } = useTab();

  if (currentTab !== value) return null;

  return (
    <div {...rest} className={twMerge("px-4 pt-8", className)} role="tabpanel">
      {children}
    </div>
  );
};

export const Tabs = ({ defaultValue, children, className, ...rest }) => {
  return (
    <TabProvider defaultTab={defaultValue}>
      <div {...rest} className={twMerge("w-96 overflow-x-hidden", className)}>
        {children}
      </div>
    </TabProvider>
  );
};
