"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
}

export default function Projects() {
  const t = useTranslations("projects");
  const projects = t.raw("list") as Project[];

  return (
    <section id="projects" className="py-24 md:py-32">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              github={project.github}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
