import React from "react";
import contextFactory from "@/lib/context-factory";

// eslint-disable-next-line react-refresh/only-export-components
export const [ThemeContext, useTheme] = contextFactory();

const ThemeProvider = ({
  defaultTheme = "light",
  storageKey = "wordstack-theme",
  children,
  ...props
}) => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(storageKey) || defaultTheme;
    }
    return defaultTheme;
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const appliedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(appliedTheme);
    localStorage.setItem(storageKey, theme);
  }, [storageKey, theme]);

  React.useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = media.matches ? "dark" : "light";
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const changeTheme = (newTheme) => setTheme(newTheme);

  const value = React.useMemo(() => ({ theme, changeTheme }), [theme]);

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
