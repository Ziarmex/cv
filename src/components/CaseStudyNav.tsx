"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft } from "@phosphor-icons/react";

interface CaseStudyNavProps {
  title: string;
}

export default function CaseStudyNav({ title }: CaseStudyNavProps) {
  const locale = useLocale();
  const t = useTranslations("caseStudy");

  return (
    <nav className="sticky top-4 z-40 mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 px-4 py-2">
        <Link
          href={`/${locale}#projects`}
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-crimson transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          {t("back")}
        </Link>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate max-w-[50%]">
          {title}
        </span>
      </div>
    </nav>
  );
}
