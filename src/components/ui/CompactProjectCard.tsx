"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Tag from "./Tag";

interface CompactProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  category: string;
  github: string;
  index: number;
}

export default function CompactProjectCard({
  title,
  description,
  tags,
  category,
  github,
  index,
}: CompactProjectCardProps) {
  return (
    <motion.a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group block rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 hover:border-crimson/30 dark:hover:border-crimson/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-crimson">
          {category}
        </span>
        <ArrowUpRight
          size={16}
          weight="bold"
          className="text-gray-300 dark:text-gray-600 group-hover:text-crimson transition-colors"
        />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </motion.a>
  );
}
