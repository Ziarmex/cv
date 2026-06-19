"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FeaturedProjectCard from "../ui/FeaturedProjectCard";
import CompactProjectCard from "../ui/CompactProjectCard";

interface FeaturedProject {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  category: string;
}

interface CompactProject {
  title: string;
  description: string;
  tags: string[];
  category: string;
  github: string;
}

export default function Projects() {
  const t = useTranslations("projects");
  const featured = t.raw("featured") as FeaturedProject[];
  const other = t.raw("other") as CompactProject[];

  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="eyebrow">{t("title")}</span>
          <p className="mt-4 text-2xl md:text-3xl font-light tracking-tight text-gray-900 dark:text-white max-w-2xl text-balance">
            {t("intro")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              tagline={project.tagline}
              tags={project.tags}
              category={project.category}
              index={index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {other.map((project, index) => (
            <CompactProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              category={project.category}
              github={project.github}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
