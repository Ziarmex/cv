"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  Code,
  Globe,
  DeviceMobile,
  Wrench,
  Terminal,
} from "@phosphor-icons/react";
import Tag from "../ui/Tag";

const categoryIcons: Record<string, React.ReactNode> = {
  iot: <Cpu size={20} weight="duotone" />,
  databases: <Database size={20} weight="duotone" />,
  languages: <Code size={20} weight="duotone" />,
  web: <Globe size={20} weight="duotone" />,
  mobile: <DeviceMobile size={20} weight="duotone" />,
  tools: <Wrench size={20} weight="duotone" />,
  python: <Terminal size={20} weight="duotone" />,
};

const categoryOrder = ["iot", "databases", "languages", "web", "mobile", "tools", "python"];

export default function Skills() {
  const t = useTranslations("skills");

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const } },
  };

  return (
    <section id="skills" className="py-24 md:py-32 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4">
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {categoryOrder.map((cat) => {
            const tags: string[] = t.raw(`items.${cat}`);
            return (
              <motion.div
                key={cat}
                variants={item}
                className={`p-6 rounded-2xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 ${
                  cat === "iot" ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-crimson">{categoryIcons[cat]}</span>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
                    {t(`categories.${cat}`)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
