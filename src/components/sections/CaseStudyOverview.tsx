"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface OverviewProps {
  problem: string;
  approach: string;
}

export default function CaseStudyOverview({ problem, approach }: OverviewProps) {
  const t = useTranslations("caseStudy");

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">{t("problem")}</span>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {problem}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="eyebrow">{t("approach")}</span>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {approach}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
