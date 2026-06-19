# Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the portfolio into a hire-me-worthy site with a polished crimson visual system, 7 projects, and 3 in-depth case study pages.

**Architecture:** Next.js 16 App Router with next-intl i18n (EN default + FR). Single-page homepage (7 refined sections) + `/[locale]/projects/[slug]` case study routes for 3 featured IoT projects. Content lives in i18n JSON files. Framer Motion for motion, Tailwind v4 for styling, zero new dependencies.

**Tech Stack:** Next.js 16, React 19, next-intl, framer-motion, Phosphor icons, Tailwind v4, Geist font.

**Verification:** `npm run lint` + `npm run build` (no test framework present — this is a presentational site).

---

## File Structure

### Modify
- `src/app/page.tsx` — change redirect `/fr` → `/en`
- `src/app/globals.css` — refined crimson palette, type scale, base styles
- `src/app/[locale]/layout.tsx` — metadata refinement, locale default
- `src/app/[locale]/page.tsx` — section order (unchanged but refined components)
- `src/components/Navbar.tsx` — scroll progress + active section
- `src/components/Footer.tsx` — polish
- `src/components/sections/Hero.tsx` — cinematic redesign
- `src/components/sections/About.tsx` — tightened narrative
- `src/components/sections/Skills.tsx` — reorganized domain matrix
- `src/components/sections/Projects.tsx` — featured + compact split, 7 projects
- `src/components/sections/Experience.tsx` — impact-focused
- `src/components/sections/Education.tsx` — polish
- `src/components/sections/Contact.tsx` — clean CTA, remove non-functional form
- `src/components/ui/Badge.tsx` — refine
- `src/components/ui/Tag.tsx` — refine
- `src/i18n/messages/en.json` — full rewrite with 7 projects + 3 case studies
- `src/i18n/messages/fr.json` — full translation
- `src/navigation.ts` — locale routing config (if needed)

### Create
- `src/app/[locale]/projects/[slug]/page.tsx` — case study route
- `src/components/ui/FeaturedProjectCard.tsx` — large card → case study link
- `src/components/ui/CompactProjectCard.tsx` — small card
- `src/components/ui/MetricCard.tsx` — results grid metric
- `src/components/ui/CodeBlock.tsx` — styled code snippet
- `src/components/ui/SectionProgress.tsx` — scroll progress bar
- `src/components/sections/CaseStudyHero.tsx`
- `src/components/sections/CaseStudyOverview.tsx`
- `src/components/sections/CaseStudyArchitecture.tsx`
- `src/components/sections/CaseStudyDeepDive.tsx`
- `src/components/sections/CaseStudyResults.tsx`
- `src/components/sections/CaseStudyLessons.tsx`
- `src/components/CaseStudyNav.tsx` — sticky mini-nav for case studies

### Delete
- `src/components/ui/ProjectCard.tsx` — replaced by Featured + Compact split

### Assets (copy from Projects/ repos)
- `public/projects/edge-pdm/` — `dashboard-demo.gif`, `l.webp` from `Projects/edge-pdm-main/assets/`
- `public/projects/parking-iot/` — `firefox_Tx0YNFWXc2.gif` from `Projects/parking-iot-main/`
- `public/projects/skydio-x2/` — `screenshot_1.png`, `screenshot_2.png`, `screenshot_3.png` from `Projects/skydio_x2/assets/`

---

## Task 1: Foundation — palette, locale default, assets

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Create: `public/projects/edge-pdm/`, `public/projects/parking-iot/`, `public/projects/skydio-x2/`

- [ ] **Step 1: Update globals.css with refined palette and type scale**

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-crimson: #e11d48;
  --color-crimson-dark: #9f1239;
  --color-crimson-deep: #6b0d1f;
}

@layer base {
  * {
    @apply border-black/5 dark:border-white/10;
  }
  body {
    @apply antialiased bg-[#fafafa] dark:bg-[#0a0a0b] text-gray-900 dark:text-white transition-colors duration-300;
  }
  ::selection {
    @apply bg-crimson/20 text-crimson-dark dark:text-white;
  }
}

html {
  scroll-behavior: smooth;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .eyebrow {
    @apply text-[11px] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400;
  }
}
```

- [ ] **Step 2: Change default locale redirect from /fr to /en**

`src/app/page.tsx`:
```tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
```

- [ ] **Step 3: Copy project assets**

```bash
mkdir -p public/projects/edge-pdm public/projects/parking-iot public/projects/skydio-x2
cp Projects/edge-pdm-main/assets/dashboard-demo.gif public/projects/edge-pdm/
cp Projects/edge-pdm-main/assets/l.webp public/projects/edge-pdm/
cp Projects/parking-iot-main/firefox_Tx0YNFWXc2.gif public/projects/parking-iot/
cp Projects/skydio_x2/assets/screenshot_1.png public/projects/skydio-x2/
cp Projects/skydio_x2/assets/screenshot_2.png public/projects/skydio-x2/
cp Projects/skydio_x2/assets/screenshot_3.png public/projects/skydio-x2/
```

- [ ] **Step 4: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS (no errors from these changes)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: refine crimson palette, change default locale to en, copy project assets"
```

---

## Task 2: i18n content — en.json full rewrite

**Files:**
- Modify: `src/i18n/messages/en.json`

This task defines the entire data model. The JSON structure drives every component. Case study content is derived from the repo exploration (see design spec).

- [ ] **Step 1: Write the complete en.json**

The structure: `nav`, `hero`, `about`, `skills`, `projects` (`featured[]` with case-study fields, `other[]` compact), `experience`, `education`, `contact`, `caseStudy` (shared labels for case study pages).

Each featured project object:
```json
{
  "slug": "edge-pdm",
  "title": "Edge Predictive Maintenance",
  "tagline": "TinyML anomaly detection that fits in 25KB and runs on a $5 chip.",
  "category": "AI & IoT",
  "tags": ["TinyML", "ESP32", "TensorFlow Lite", "Anomaly Detection", "Edge AI"],
  "heroImage": "/projects/edge-pdm/dashboard-demo.gif",
  "problem": "...",
  "approach": "...",
  "architecture": {
    "flow": ["Sensor @ 1kHz", "Buffer 128 samples", "FFT → 64 features", "StandardScaler", "TFLite Autoencoder", "MSE > threshold?", "LED alert"],
    "components": [
      { "layer": "Hardware", "tech": "ESP32 DevKit (240MHz, 520KB RAM)", "role": "Edge inference device + LED alert" },
      ...
    ],
    "decisions": ["...", "..."]
  },
  "deepDive": [
    { "title": "...", "body": "...", "code": "..." }
  ],
  "results": [
    { "label": "Model size", "value": "24.9 KB" },
    ...
  ],
  "demoFeatures": ["...", "..."],
  "lessons": ["...", "..."],
  "github": "https://github.com/Ziarmex/edge-pdm"
}
```

Write the full en.json with all 7 projects (3 featured with full case-study content + 4 compact). Use the real metrics and architecture details from the repo exploration.

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/i18n/messages/en.json
git commit -m "content: rewrite en.json with 7 projects and 3 case studies"
```

---

## Task 3: i18n content — fr.json translation

**Files:**
- Modify: `src/i18n/messages/fr.json`

- [ ] **Step 1: Translate en.json content to French**

Match the exact structure of en.json. Translate all prose. Keep technical terms, tech names, and code snippets in their original form. Keep French quotes from the original repos where they add authenticity.

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/i18n/messages/fr.json
git commit -m "content: translate fr.json to match new structure"
```

---

## Task 4: Shared UI components

**Files:**
- Create: `src/components/ui/SectionProgress.tsx`
- Create: `src/components/ui/MetricCard.tsx`
- Create: `src/components/ui/CodeBlock.tsx`
- Modify: `src/components/ui/Badge.tsx`
- Modify: `src/components/ui/Tag.tsx`

- [ ] **Step 1: Create SectionProgress (scroll progress bar)**

```tsx
"use client";

import { motion, useScroll } from "framer-motion";

export default function SectionProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-crimson origin-left z-[60]"
    />
  );
}
```

- [ ] **Step 2: Create MetricCard**

```tsx
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string;
  index?: number;
}

export default function MetricCard({ label, value, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6"
    >
      <div className="text-3xl md:text-4xl font-bold tracking-tight text-crimson font-mono">
        {value}
      </div>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create CodeBlock**

```tsx
interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-[#0d0d0f] dark:bg-black/40 overflow-hidden">
      {language && (
        <div className="px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-gray-500 border-b border-white/5">
          {language}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-gray-300 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
```

- [ ] **Step 4: Refine Badge**

```tsx
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export default function Badge({ children, dot, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crimson/10 dark:bg-crimson/15 text-crimson-dark dark:text-crimson text-xs font-medium border border-crimson/20 ${className}`}
    >
      {dot && (
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full bg-crimson animate-ping opacity-60" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-crimson" />
        </span>
      )}
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Refine Tag**

```tsx
interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono text-gray-600 dark:text-gray-300 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
      {children}
    </span>
  );
}
```

- [ ] **Step 6: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add SectionProgress, MetricCard, CodeBlock; refine Badge and Tag"
```

---

## Task 5: Navbar — scroll progress + active section

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar with active section tracking and scroll progress**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import SectionProgress from "./ui/SectionProgress";

const sections = ["about", "skills", "projects", "experience", "education", "contact"];

export default function Navbar() {
  const t = useTranslations("nav");
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SectionProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
          {sections.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                active === id
                  ? "text-crimson"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-crimson/10 dark:bg-crimson/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{t(id)}</span>
            </button>
          ))}
          <div className="w-px h-5 mx-1 bg-black/10 dark:bg-white/10" />
          <LangToggle />
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: navbar with scroll progress and active section highlight"
```

---

## Task 6: Hero — cinematic redesign

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Rewrite Hero**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, Github } from "@phosphor-icons/react";
import Badge from "../ui/Badge";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-crimson/10 dark:bg-crimson/[0.07] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-crimson-dark/10 dark:bg-crimson-dark/[0.05] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        >
          <Badge dot>{t("available")}</Badge>

          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-gray-900 dark:text-white text-balance">
            {t("title")}
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-mono max-w-2xl">
            {t("subtitle")}
          </p>

          <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            {t("focus")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-crimson text-white text-sm font-medium hover:bg-crimson-dark transition-colors"
            >
              {t("cta")}
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowDown size={12} weight="bold" />
              </span>
            </motion.button>

            <a
              href={t("github")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-black/10 dark:border-white/15 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Github size={16} weight="bold" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-crimson to-transparent"
        />
      </motion.div>
    </section>
  );
}
```

Note: adds `hero.focus` and `hero.github` keys to i18n (already included in Task 2 content rewrite).

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: cinematic hero with focus line, GitHub CTA, scroll indicator"
```

---

## Task 7: About + Skills sections

**Files:**
- Modify: `src/components/sections/About.tsx`
- Modify: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Rewrite About**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16"
        >
          <div>
            <span className="eyebrow">{t("title")}</span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-light tracking-tight leading-relaxed text-gray-900 dark:text-white text-balance">
              {t("description")}
            </p>
            <p className="mt-6 text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              {t("detail")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

Note: adds `about.detail` key to i18n.

- [ ] **Step 2: Rewrite Skills as a domain-grouped matrix**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const categories = ["iot", "languages", "web", "mobile", "databases", "tools", "python"] as const;

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow">{t("title")}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {categories.map((cat, i) => {
            const items = t.raw(`items.${cat}`) as string[];
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <h3 className="text-sm font-mono text-crimson mb-4">{t(`categories.${cat}`)}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-mono text-gray-600 dark:text-gray-300 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About.tsx src/components/sections/Skills.tsx
git commit -m "feat: refined About with detail line; Skills as domain-grouped matrix"
```

---

## Task 8: Project cards — Featured + Compact split

**Files:**
- Create: `src/components/ui/FeaturedProjectCard.tsx`
- Create: `src/components/ui/CompactProjectCard.tsx`
- Delete: `src/components/ui/ProjectCard.tsx` (after dependents updated)

- [ ] **Step 1: Create FeaturedProjectCard**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import Tag from "./Tag";

interface FeaturedProjectCardProps {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  category: string;
  index: number;
}

export default function FeaturedProjectCard({
  slug,
  title,
  tagline,
  tags,
  category,
  index,
}: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${slug}`}
        className="group block rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 md:p-10 hover:border-crimson/30 dark:hover:border-crimson/40 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-crimson">
            {category}
          </span>
          <ArrowUpRight
            size={20}
            weight="bold"
            className="text-gray-300 dark:text-gray-600 group-hover:text-crimson group-hover:rotate-0 transition-all duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-xl">
          {tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create CompactProjectCard**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Tag from "./Tag";

interface CompactProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  category: string;
  github: string;
  index: number;
}

export default function CompactProjectCard({
  title,
  description,
  tags,
  category,
  github,
  index,
}: CompactProjectCardProps) {
  return (
    <motion.a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group block rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 hover:border-crimson/30 dark:hover:border-crimson/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-crimson">
          {category}
        </span>
        <ArrowUpRight
          size={16}
          weight="bold"
          className="text-gray-300 dark:text-gray-600 group-hover:text-crimson transition-colors"
        />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </motion.a>
  );
}
```

- [ ] **Step 3: Delete old ProjectCard.tsx**

```bash
rm src/components/ui/ProjectCard.tsx
```

- [ ] **Step 4: Verify build** (will fail — Projects.tsx still imports old ProjectCard. That's fixed in Task 9.)

Run: `npm run build`
Expected: FAIL (import error) — acceptable, fixed next task.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/FeaturedProjectCard.tsx src/components/ui/CompactProjectCard.tsx src/components/ui/ProjectCard.tsx
git commit -m "feat: split ProjectCard into FeaturedProjectCard and CompactProjectCard"
```

---

## Task 9: Projects section — wire up 7 projects

**Files:**
- Modify: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Rewrite Projects section**

```tsx
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
```

Note: adds `projects.intro` key to i18n.

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: Projects section with 3 featured + 4 compact, category tags"
```

---

## Task 10: Experience + Education + Contact + Footer polish

**Files:**
- Modify: `src/components/sections/Experience.tsx`
- Modify: `src/components/sections/Education.tsx`
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Read current Experience, Education, Contact, Footer to preserve structure**

Read each file before rewriting to keep the i18n key patterns consistent.

- [ ] **Step 2: Rewrite Experience with impact focus**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ExpItem {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export default function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExpItem[];

  return (
    <section id="experience" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow">{t("title")}</span>
        </motion.div>

        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16"
            >
              <div>
                <div className="text-sm font-mono text-crimson">{item.period}</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.role}</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">{item.company}</p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((d) => (
                    <li key={d} className="text-gray-600 dark:text-gray-300 leading-relaxed flex gap-3">
                      <span className="text-crimson mt-1.5 flex-shrink-0">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite Education**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface EduItem {
  degree: string;
  school: string;
  period: string;
}

export default function Education() {
  const t = useTranslations("education");
  const items = t.raw("items") as EduItem[];

  return (
    <section id="education" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow">{t("title")}</span>
        </motion.div>

        <div className="space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16"
            >
              <div className="text-sm font-mono text-crimson">{item.period}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.degree}</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">{item.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite Contact — clean CTA, remove non-functional form**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Envelope, Phone, Github, ArrowUpRight } from "@phosphor-icons/react";

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
              <Github size={16} weight="bold" />
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
```

Note: adds `contact.heading` and `contact.subheading` keys; removes `formName/formEmail/formMessage/formSend` keys (non-functional form removed).

- [ ] **Step 5: Rewrite Footer**

Read current Footer first, then apply minimal polish — keep structure, refine styling to match new palette.

- [ ] **Step 6: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Experience.tsx src/components/sections/Education.tsx src/components/sections/Contact.tsx src/components/Footer.tsx
git commit -m "feat: polish Experience, Education, Contact (clean CTA), Footer"
```

---

## Task 11: Case study components

**Files:**
- Create: `src/components/sections/CaseStudyHero.tsx`
- Create: `src/components/sections/CaseStudyOverview.tsx`
- Create: `src/components/sections/CaseStudyArchitecture.tsx`
- Create: `src/components/sections/CaseStudyDeepDive.tsx`
- Create: `src/components/sections/CaseStudyResults.tsx`
- Create: `src/components/sections/CaseStudyLessons.tsx`
- Create: `src/components/CaseStudyNav.tsx`

- [ ] **Step 1: Create CaseStudyNav (sticky mini-nav)**

```tsx
"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowLeft } from "@phosphor-icons/react";

interface CaseStudyNavProps {
  title: string;
}

export default function CaseStudyNav({ title }: CaseStudyNavProps) {
  const locale = useLocale();

  return (
    <nav className="sticky top-4 z-40 mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 px-4 py-2">
        <Link
          href={`/${locale}#projects`}
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-crimson transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          Projects
        </Link>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate max-w-[50%]">
          {title}
        </span>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create CaseStudyHero**

```tsx
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
```

- [ ] **Step 3: Create CaseStudyOverview**

```tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface OverviewProps {
  problem: string;
  approach: string;
}

export default function CaseStudyOverview({ problem, approach }: OverviewProps) {
  const t = useTranslations("caseStudy");

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">{t("problem")}</span>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {problem}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="eyebrow">{t("approach")}</span>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {approach}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create CaseStudyArchitecture**

```tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Component {
  layer: string;
  tech: string;
  role: string;
}

interface ArchitectureProps {
  flow: string[];
  components: Component[];
  decisions: string[];
}

export default function CaseStudyArchitecture({ flow, components, decisions }: ArchitectureProps) {
  const t = useTranslations("caseStudy");

  return (
    <section className="py-20 md:py-24 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="eyebrow">{t("architecture")}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-2">
            {flow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-lg bg-white dark:bg-white/[0.05] border border-black/5 dark:border-white/10 text-sm font-mono text-gray-700 dark:text-gray-200">
                  {step}
                </span>
                {i < flow.length - 1 && <span className="text-crimson">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-wider text-crimson mb-4">
              {t("stack")}
            </h3>
            <div className="space-y-3">
              {components.map((c) => (
                <div
                  key={c.layer}
                  className="grid grid-cols-[100px_1fr] gap-4 text-sm py-2 border-b border-black/5 dark:border-white/5"
                >
                  <span className="font-mono text-gray-500 dark:text-gray-400">{c.layer}</span>
                  <span className="text-gray-800 dark:text-gray-200">
                    <strong className="font-semibold">{c.tech}</strong>
                    <span className="block text-gray-500 dark:text-gray-400 text-xs mt-0.5">{c.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-wider text-crimson mb-4">
              {t("decisions")}
            </h3>
            <ul className="space-y-3">
              {decisions.map((d) => (
                <li key={d} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-3">
                  <span className="text-crimson mt-1 flex-shrink-0">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create CaseStudyDeepDive**

```tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CodeBlock from "../ui/CodeBlock";

interface DeepDiveItem {
  title: string;
  body: string;
  code?: string;
  language?: string;
}

interface DeepDiveProps {
  items: DeepDiveItem[];
}

export default function CaseStudyDeepDive({ items }: DeepDiveProps) {
  const t = useTranslations("caseStudy");

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="eyebrow">{t("deepDive")}</span>
        </motion.div>

        <div className="space-y-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-3xl">
                {item.body}
              </p>
              {item.code && <CodeBlock code={item.code} language={item.language} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create CaseStudyResults**

```tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MetricCard from "../ui/MetricCard";

interface ResultsProps {
  metrics: { label: string; value: string }[];
  demoFeatures: string[];
}

export default function CaseStudyResults({ metrics, demoFeatures }: ResultsProps) {
  const t = useTranslations("caseStudy");

  return (
    <section className="py-20 md:py-24 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="eyebrow">{t("results")}</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} label={m.label} value={m.value} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-mono uppercase tracking-wider text-crimson mb-4">
            {t("demoFeatures")}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {demoFeatures.map((f) => (
              <li key={f} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-3">
                <span className="text-crimson mt-1 flex-shrink-0">→</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Create CaseStudyLessons**

```tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface LessonsProps {
  lessons: string[];
  github: string;
  nextSlug?: string;
  nextTitle?: string;
}

export default function CaseStudyLessons({ lessons, github, nextSlug, nextTitle }: LessonsProps) {
  const t = useTranslations("caseStudy");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="eyebrow">{t("lessons")}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <ul className="space-y-4">
            {lessons.map((l) => (
              <li key={l} className="text-gray-700 dark:text-gray-300 leading-relaxed flex gap-3">
                <span className="text-crimson mt-1.5 flex-shrink-0">→</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-black/5 dark:border-white/10 p-6 hover:border-crimson/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-crimson">GitHub</span>
                <ArrowUpRight size={16} weight="bold" className="text-gray-400 group-hover:text-crimson transition-colors" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("viewSource")}</span>
            </a>

            {nextSlug && nextTitle && (
              <Link
                href={`/projects/${nextSlug}`}
                className="block rounded-2xl border border-black/5 dark:border-white/10 p-6 hover:border-crimson/30 transition-colors group"
              >
                <div className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-2">
                  {t("nextProject")}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{nextTitle}</span>
                  <ArrowUpRight size={16} weight="bold" className="text-gray-400 group-hover:text-crimson transition-colors" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS (components are created but not yet routed — they compile independently)

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/CaseStudy*.tsx src/components/CaseStudyNav.tsx
git commit -m "feat: case study section components (hero, overview, architecture, deepdive, results, lessons)"
```

---

## Task 12: Case study route + page assembly

**Files:**
- Create: `src/app/[locale]/projects/[slug]/page.tsx`
- Modify: `src/i18n/messages/en.json` (add `caseStudy` shared labels — already in Task 2)

- [ ] **Step 1: Create the case study page route**

```tsx
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyHero from "@/components/sections/CaseStudyHero";
import CaseStudyOverview from "@/components/sections/CaseStudyOverview";
import CaseStudyArchitecture from "@/components/sections/CaseStudyArchitecture";
import CaseStudyDeepDive from "@/components/sections/CaseStudyDeepDive";
import CaseStudyResults from "@/components/sections/CaseStudyResults";
import CaseStudyLessons from "@/components/sections/CaseStudyLessons";
import en from "@/i18n/messages/en.json";
import fr from "@/i18n/messages/fr.json";

const messagesMap = { en, fr } as const;
const slugs = ["edge-pdm", "mini-plant", "plc-gateway"];

export function generateStaticParams() {
  return [{ locale: "en", slug: "edge-pdm" }, { locale: "en", slug: "mini-plant" }, { locale: "en", slug: "plc-gateway" }, { locale: "fr", slug: "edge-pdm" }, { locale: "fr", slug: "mini-plant" }, { locale: "fr", slug: "plc-gateway" }];
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const msgs = messagesMap[locale as keyof typeof messagesMap] ?? fr;
  const featured = (msgs.projects as any).featured as any[];
  const project = featured.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ziad Rafik Bouraoui`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const msgs = messagesMap[locale as keyof typeof messagesMap] ?? fr;
  const featured = (msgs.projects as any).featured as any[];
  const index = featured.findIndex((p) => p.slug === slug);

  if (index === -1 || !slugs.includes(slug)) {
    notFound();
  }

  const project = featured[index];
  const nextProject = featured[(index + 1) % featured.length];

  return (
    <>
      <CaseStudyNav title={project.title} />
      <CaseStudyHero
        title={project.title}
        tagline={project.tagline}
        tags={project.tags}
        category={project.category}
        heroImage={project.heroImage}
        github={project.github}
      />
      <CaseStudyOverview problem={project.problem} approach={project.approach} />
      <CaseStudyArchitecture
        flow={project.architecture.flow}
        components={project.architecture.components}
        decisions={project.architecture.decisions}
      />
      <CaseStudyDeepDive items={project.deepDive} />
      <CaseStudyResults metrics={project.results} demoFeatures={project.demoFeatures} />
      <CaseStudyLessons
        lessons={project.lessons}
        github={project.github}
        nextSlug={nextProject.slug}
        nextTitle={nextProject.title}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/projects/[slug]/page.tsx
git commit -m "feat: case study route with static generation for 3 projects"
```

---

## Task 13: Final build, lint, dev run

- [ ] **Step 1: Full lint**

Run: `npm run lint`
Expected: PASS, no errors

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: PASS, all routes generated including case study pages

- [ ] **Step 3: Start dev server**

Run: `npm run dev`
Expected: server starts on http://localhost:3000, redirects to /en

- [ ] **Step 4: Manual verification checklist**

- [ ] Homepage loads at /en with crimson theme
- [ ] Dark mode toggle works
- [ ] EN/FR toggle works
- [ ] Navbar scroll-progress bar animates
- [ ] Navbar active section highlights as you scroll
- [ ] Hero renders with focus line + CTAs
- [ ] About renders with description + detail
- [ ] Skills renders as domain matrix
- [ ] Projects: 3 featured cards link to case studies
- [ ] Projects: 4 compact cards link to GitHub
- [ ] Experience/Education render with timeline layout
- [ ] Contact renders clean CTA (no form)
- [ ] Case study /en/projects/edge-pdm loads
- [ ] Case study /en/projects/mini-plant loads
- [ ] Case study /en/projects/plc-gateway loads
- [ ] Case study nav links back to projects
- [ ] Case study next-project links work
- [ ] Mobile responsive at 375px width

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: portfolio overhaul complete — hire-me worthy"
```
