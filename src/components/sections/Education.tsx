"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface EduItem {
  degree: string;
  school: string;
  period: string;
}

export default function Education() {
  const t = useTranslations("education");
  const items = t.raw("items") as EduItem[];

  return (
    <section id="education" className="py-32 md:py-40">
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

        <div className="space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16"
            >
              <div className="text-sm font-mono text-crimson">{item.period}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.degree}</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">{item.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
