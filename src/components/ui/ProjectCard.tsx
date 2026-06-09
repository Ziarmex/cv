"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  index: number;
}

export default function ProjectCard({ title, description, tags, github, index }: ProjectCardProps) {
  return (
    <motion.a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ y: -4 }}
      className="group relative p-6 rounded-2xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 hover:border-crimson/30 transition-colors duration-500"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 dark:bg-crimson/10 group-hover:bg-crimson/20 transition-colors shrink-0 ml-3">
          <ArrowUpRight size={14} weight="bold" className="text-gray-600 dark:text-gray-400 group-hover:text-crimson transition-colors" />
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-black/5 dark:bg-crimson/10 text-gray-600 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
