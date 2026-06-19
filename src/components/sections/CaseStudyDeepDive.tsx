"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CodeBlock from "../ui/CodeBlock";

interface DeepDiveItem {
  title: string;
  body: string;
  code?: string;
  language?: string;
}

interface DeepDiveProps {
  items: DeepDiveItem[];
}

export default function CaseStudyDeepDive({ items }: DeepDiveProps) {
  const t = useTranslations("caseStudy");

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="eyebrow">{t("deepDive")}</span>
        </motion.div>

        <div className="space-y-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-3xl">
                {item.body}
              </p>
              {item.code && <CodeBlock code={item.code} language={item.language} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
