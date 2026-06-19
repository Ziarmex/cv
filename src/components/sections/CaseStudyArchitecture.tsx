"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Component {
  layer: string;
  tech: string;
  role: string;
}

interface ArchitectureProps {
  flow: string[];
  components: Component[];
  decisions: string[];
}

export default function CaseStudyArchitecture({ flow, components, decisions }: ArchitectureProps) {
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
          <span className="eyebrow">{t("architecture")}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-2">
            {flow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-lg bg-white dark:bg-white/[0.05] border border-black/5 dark:border-white/10 text-sm font-mono text-gray-700 dark:text-gray-200">
                  {step}
                </span>
                {i < flow.length - 1 && <span className="text-crimson">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-wider text-crimson mb-4">
              {t("stack")}
            </h3>
            <div className="space-y-3">
              {components.map((c) => (
                <div
                  key={c.layer}
                  className="grid grid-cols-[100px_1fr] gap-4 text-sm py-2 border-b border-black/5 dark:border-white/5"
                >
                  <span className="font-mono text-gray-500 dark:text-gray-400">{c.layer}</span>
                  <span className="text-gray-800 dark:text-gray-200">
                    <strong className="font-semibold">{c.tech}</strong>
                    <span className="block text-gray-500 dark:text-gray-400 text-xs mt-0.5">{c.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-wider text-crimson mb-4">
              {t("decisions")}
            </h3>
            <ul className="space-y-3">
              {decisions.map((d) => (
                <li key={d} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-3">
                  <span className="text-crimson mt-1 flex-shrink-0">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
