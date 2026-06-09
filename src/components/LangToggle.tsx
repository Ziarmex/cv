"use client";

import { useLocale } from "next-intl";

export default function LangToggle() {
  const locale = useLocale();

  const toggle = () => {
    const next = locale === "fr" ? "en" : "fr";
    const path = window.location.pathname;
    const segs = path.split("/").filter(Boolean);
    if (segs[0] === "fr" || segs[0] === "en") segs[0] = next;
    else segs.unshift(next);
    window.location.href = "/" + segs.join("/");
  };

  return (
    <button
      onClick={toggle}
      className="px-2 py-1 text-sm font-medium rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors uppercase tracking-wider"
      aria-label="Toggle language"
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}
