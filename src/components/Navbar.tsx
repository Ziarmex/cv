"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import SectionProgress from "./ui/SectionProgress";

const sections = ["about", "skills", "projects", "experience", "education", "contact"];

export default function Navbar() {
  const t = useTranslations("nav");
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SectionProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] overflow-x-auto max-w-[calc(100vw-16px)]">
          {sections.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                active === id
                  ? "text-crimson"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-crimson/10 dark:bg-crimson/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{t(id)}</span>
            </button>
          ))}
          <div className="w-px h-5 mx-1 bg-black/10 dark:bg-white/10" />
          <LangToggle />
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
