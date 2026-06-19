"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Tag from "../ui/Tag";

interface CaseStudyHeroProps {
  title: string;
  tagline: string;
  tags: string[];
  category: string;
  heroImage?: string;
  github: string;
}

export default function CaseStudyHero({
  title,
  tagline,
  tags,
  category,
  heroImage,
  github,
}: CaseStudyHeroProps) {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow text-crimson">{category}</span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white text-balance">
            {title}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl font-light leading-relaxed text-balance">
            {tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-crimson hover:text-crimson-dark transition-colors"
          >
            View on GitHub
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </motion.div>

        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03]"
          >
            <img
              src={heroImage}
              alt={`${title} demo`}
              className="w-full h-auto"
              loading="eager"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
