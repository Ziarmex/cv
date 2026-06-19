"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Envelope, Phone, GithubLogo, ArrowUpRight } from "@phosphor-icons/react";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] p-10 md:p-16 text-center"
        >
          <span className="eyebrow">{t("title")}</span>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white text-balance">
            {t("heading")}
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {t("subheading")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${t("email")}`}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-crimson text-white text-sm font-medium hover:bg-crimson-dark transition-colors"
            >
              <Envelope size={16} weight="bold" />
              {t("email")}
            </a>
            <a
              href={t("github")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-black/10 dark:border-white/15 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <GithubLogo size={16} weight="bold" />
              GitHub
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-500 font-mono">
            <Phone size={14} />
            {t("phone")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
