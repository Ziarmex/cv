"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-[65ch] mx-auto text-center"
        >
          <span className="inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400 mb-6">
            {t("title")}
          </span>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-400">
            {t("description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
