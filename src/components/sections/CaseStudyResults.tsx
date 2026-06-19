"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MetricCard from "../ui/MetricCard";

interface ResultsProps {
  metrics: { label: string; value: string }[];
  demoFeatures: string[];
}

export default function CaseStudyResults({ metrics, demoFeatures }: ResultsProps) {
  const t = useTranslations("caseStudy");

  return (
    <section className="py-20 md:py-24 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="eyebrow">{t("results")}</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} label={m.label} value={m.value} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-mono uppercase tracking-wider text-crimson mb-4">
            {t("demoFeatures")}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {demoFeatures.map((f) => (
              <li key={f} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-3">
                <span className="text-crimson mt-1 flex-shrink-0">→</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
