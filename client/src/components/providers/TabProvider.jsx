import contextFactory from "@/lib/context-factory";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const [TabContext, useTab] = contextFactory();

const TabProvider = ({ children, defaultTab }) => {
  const [currentTab, setCurrentTab] = React.useState(defaultTab);

  const handleChangeTab = React.useCallback((tab) => setCurrentTab(tab), []);

  return (
    <TabContext.Provider value={{ currentTab, onChangeTab: handleChangeTab }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
