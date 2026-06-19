"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ExpItem {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export default function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExpItem[];

  return (
    <section id="experience" className="py-32 md:py-40">
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

        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16"
            >
              <div>
                <div className="text-sm font-mono text-crimson">{item.period}</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.role}</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">{item.company}</p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((d) => (
                    <li key={d} className="text-gray-600 dark:text-gray-300 leading-relaxed flex gap-3">
                      <span className="text-crimson mt-1.5 flex-shrink-0">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
