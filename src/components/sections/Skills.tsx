"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const categories = ["iot", "languages", "web", "mobile", "databases", "tools", "python"] as const;

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow">{t("title")}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {categories.map((cat, i) => {
            const items = t.raw(`items.${cat}`) as string[];
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <h3 className="text-sm font-mono text-crimson mb-4">{t(`categories.${cat}`)}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-mono text-gray-600 dark:text-gray-300 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
