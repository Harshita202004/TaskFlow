import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "taskflow-theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const value = useMemo(
  () => ({
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setTheme,
  }),
  [theme]
);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};