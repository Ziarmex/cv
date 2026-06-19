"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "@/navigation";

interface LessonsProps {
  lessons: string[];
  github: string;
  nextSlug?: string;
  nextTitle?: string;
}

export default function CaseStudyLessons({ lessons, github, nextSlug, nextTitle }: LessonsProps) {
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
          <span className="eyebrow">{t("lessons")}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <ul className="space-y-4">
            {lessons.map((l) => (
              <li key={l} className="text-gray-700 dark:text-gray-300 leading-relaxed flex gap-3">
                <span className="text-crimson mt-1.5 flex-shrink-0">→</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-black/5 dark:border-white/10 p-6 hover:border-crimson/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-crimson">GitHub</span>
                <ArrowUpRight size={16} weight="bold" className="text-gray-400 group-hover:text-crimson transition-colors" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("viewSource")}</span>
            </a>

            {nextSlug && nextTitle && (
              <Link
                href={`/projects/${nextSlug}`}
                className="block rounded-2xl border border-black/5 dark:border-white/10 p-6 hover:border-crimson/30 transition-colors group"
              >
                <div className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-2">
                  {t("nextProject")}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{nextTitle}</span>
                  <ArrowUpRight size={16} weight="bold" className="text-gray-400 group-hover:text-crimson transition-colors" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
