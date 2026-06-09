"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Briefcase } from "@phosphor-icons/react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export default function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExperienceItem[];

  return (
    <section id="experience" className="py-24 md:py-32 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400 mb-4">
            {t("title")}
          </span>
        </motion.div>

        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="relative pl-8 border-l border-black/10 dark:border-white/10">
                <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-crimson/20 border-2 border-crimson flex items-center justify-center">
                  <Briefcase size={8} weight="fill" className="text-crimson" />
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{item.period}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{item.role}</h3>
                <p className="text-sm text-crimson dark:text-crimson mb-3">{item.company}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-gray-400" />
                      {detail}
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
