"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "@/navigation";
import Tag from "./Tag";

interface FeaturedProjectCardProps {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  category: string;
  index: number;
}

export default function FeaturedProjectCard({
  slug,
  title,
  tagline,
  tags,
  category,
  index,
}: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${slug}`}
        className="group block rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 md:p-10 hover:border-crimson/30 dark:hover:border-crimson/40 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-crimson">
            {category}
          </span>
          <ArrowUpRight
            size={20}
            weight="bold"
            className="text-gray-300 dark:text-gray-600 group-hover:text-crimson transition-all duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-xl">
          {tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
