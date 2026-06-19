"use client";

import { useSyncExternalStore, useCallback } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(
    () => () => {},
    getSnapshot,
    getServerSnapshot
  );

  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, [isDark]);

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={18} weight="duotone" />
      ) : (
        <Moon size={18} weight="duotone" />
      )}
    </button>
  );
}
