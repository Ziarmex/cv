"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap } from "@phosphor-icons/react";

interface EducationItem {
  degree: string;
  school: string;
  period: string;
}

export default function Education() {
  const t = useTranslations("education");
  const items = t.raw("items") as EducationItem[];

  return (
    <section id="education" className="py-24 md:py-32">
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
                <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-crimson-dark/20 border-2 border-crimson-dark flex items-center justify-center">
                  <GraduationCap size={8} weight="fill" className="text-crimson-dark" />
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{item.period}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{item.degree}</h3>
                <p className="text-sm text-crimson-dark dark:text-crimson-dark">{item.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
