"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const systemPrefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const shouldDark = saved ? saved === "dark" : systemPrefersDark;

      setIsDark(shouldDark);
      document.documentElement.classList.toggle("dark", shouldDark);
    } catch {
      
    }
  }, []);

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        const newIsDark = e.newValue === "dark";
        setIsDark(newIsDark);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
