"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, GithubLogo } from "@phosphor-icons/react";
import Badge from "../ui/Badge";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-crimson/10 dark:bg-crimson/[0.07] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-crimson-dark/10 dark:bg-crimson-dark/[0.05] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        >
          <Badge dot>{t("available")}</Badge>

          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-gray-900 dark:text-white text-balance">
            {t("title")}
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-mono max-w-2xl">
            {t("subtitle")}
          </p>

          <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            {t("focus")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-crimson text-white text-sm font-medium hover:bg-crimson-dark transition-colors"
            >
              {t("cta")}
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowDown size={12} weight="bold" />
              </span>
            </motion.button>

            <a
              href={t("github")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-black/10 dark:border-white/15 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <GithubLogo size={16} weight="bold" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-crimson to-transparent"
        />
      </motion.div>
    </section>
  );
}
