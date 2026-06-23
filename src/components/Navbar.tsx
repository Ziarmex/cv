"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import SectionProgress from "./ui/SectionProgress";

const sections = ["about", "skills", "projects", "experience", "education", "contact"];

export default function Navbar() {
  const t = useTranslations("nav");
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  return (
    <>
      <SectionProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
        {/* Desktop pills */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
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

        {/* Mobile hamburger */}
        <div className="pointer-events-auto sm:hidden flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-gray-600 dark:text-gray-400"
            aria-label="Menu"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
          <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
          <LangToggle />
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 left-4 right-4 z-50 sm:hidden"
          >
            <div className="rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-xl overflow-hidden pointer-events-auto">
              {sections.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-colors ${
                    active === id
                      ? "text-crimson bg-crimson/5"
                      : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {t(id)}
                  {active === id && (
                    <span className="float-right text-crimson">●</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 sm:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
