"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import Badge from "../ui/Badge";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-crimson/10 dark:bg-crimson/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-crimson-dark/10 dark:bg-crimson-dark/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
          >
            <Badge dot>{t("available")}</Badge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-gray-900 dark:text-white mt-6">
              {t("title")}
            </h1>

            <div className="mt-4 h-8">
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-mono">
                {t("subtitle")}
                <span className="inline-block w-0.5 h-5 ml-1 bg-crimson animate-pulse align-middle" />
              </p>
            </div>

            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              {t("cta")}
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 dark:bg-black/20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowDown size={12} weight="bold" />
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border border-crimson/20 animate-spin" style={{ animationDuration: "20s" }} />
              <div className="absolute inset-4 rounded-full border border-crimson-dark/10" style={{ animation: "spin 15s linear infinite reverse" }} />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-crimson/10 to-crimson-dark/10 backdrop-blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
