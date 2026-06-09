"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Envelope, Phone, GithubLogo } from "@phosphor-icons/react";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-24 md:py-32 bg-black/[0.02] dark:bg-white/[0.02]">
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
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            <a
              href="mailto:ziad.r.bouraoui@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 hover:border-crimson/30 transition-colors group"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-crimson/10 text-crimson group-hover:bg-crimson/20 transition-colors">
                <Envelope size={18} weight="duotone" />
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t("email")}</span>
            </a>
            <a
              href="tel:+213659019559"
              className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 hover:border-crimson/30 transition-colors group"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-crimson/10 text-crimson group-hover:bg-crimson/20 transition-colors">
                <Phone size={18} weight="duotone" />
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t("phone")}</span>
            </a>
            <a
              href="https://github.com/Ziarmex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 hover:border-crimson/30 transition-colors group"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-crimson/10 text-crimson group-hover:bg-crimson/20 transition-colors">
                <GithubLogo size={18} weight="duotone" />
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">GitHub</span>
            </a>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder={t("formName")}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-crimson/50 transition-colors"
            />
            <input
              type="email"
              placeholder={t("formEmail")}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-crimson/50 transition-colors"
            />
            <textarea
              rows={4}
              placeholder={t("formMessage")}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a0000] border border-black/5 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-crimson/50 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors active:scale-[0.98]"
            >
              {t("formSend")}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
