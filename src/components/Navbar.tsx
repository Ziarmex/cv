"use client";

import { useTranslations } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";

const sections = ["about", "skills", "projects", "experience", "education", "contact"];

export default function Navbar() {
  const t = useTranslations("nav");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
        {sections.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all duration-300"
          >
            {t(id)}
          </button>
        ))}
        <div className="w-px h-5 mx-1 bg-black/10 dark:bg-white/10" />
        <LangToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}
