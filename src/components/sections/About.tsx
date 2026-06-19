"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16"
        >
          <div>
            <span className="eyebrow">{t("title")}</span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-light tracking-tight leading-relaxed text-gray-900 dark:text-white text-balance">
              {t("description")}
            </p>
            <p className="mt-6 text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              {t("detail")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
