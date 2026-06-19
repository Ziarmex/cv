"use client";

import { useTranslations } from "next-intl";
import { GithubLogo, Envelope } from "@phosphor-icons/react";

export default function Footer() {
  const t = useTranslations("contact");

  return (
    <footer className="py-8 border-t border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
          &copy; {new Date().getFullYear()} Ziad Rafik Bouraoui. {t("copyright")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:ziad.r.bouraoui@gmail.com"
            className="text-gray-500 hover:text-crimson transition-colors"
            aria-label="Email"
          >
            <Envelope size={18} weight="duotone" />
          </a>
          <a
            href="https://github.com/Ziarmex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-crimson transition-colors"
            aria-label="GitHub"
          >
            <GithubLogo size={18} weight="duotone" />
          </a>
        </div>
      </div>
    </footer>
  );
}
