# Portfolio Overhaul — Design Spec

**Date:** 2026-06-19
**Owner:** Ziad Rafik Bouraoui
**Status:** Approved
**Goal:** Make the portfolio site hire-me worthy — scannable for recruiters, deep enough for engineering managers.

## Context

The current site is a Next.js 16 single-page portfolio with EN/FR i18n, crimson theme, and dark mode. Content is IoT/industrial-focused with 5 GitHub projects and a Sonelgaz internship. The visual style works but lacks polish; project descriptions are too thin for engineering managers to judge technical depth; two additional projects (`parking-iot`, `skydio_x2`) exist as repos but are not represented on the site.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Primary goal | Make it hire-me worthy | User-stated |
| Audience | Mixed (recruiters + engineers) | Broadest reach for a student |
| Aesthetic | Keep crimson, polish it (refined palette, dark-primary) | Preserve identity, elevate execution |
| Scope | Single-page homepage + 3 case study pages | Depth for engineers, scannability for recruiters |
| Featured projects | edge-pdm, mini-plant, plc-gateway | Three most substantial IoT projects |
| Visual approach | Hybrid: cinematic hero + structured sections + sticky nav with scroll-progress | Premium first impression without grid-layout risk |
| Default locale | EN (was FR) | Broader international recruiter reach; FR fully supported |

## Architecture

### Routes

- `/` → redirect to `/en` (changed from `/fr`)
- `/[locale]` — homepage with refined sections
- `/[locale]/projects/[slug]` — case study pages for `edge-pdm`, `mini-plant`, `plc-gateway`

### Homepage Sections (kept, refined)

1. **Hero** — cinematic, full-bleed, large name + role + one-line focus + single CTA
2. **About** — tightened narrative + current-focus line
3. **Skills** — reorganized matrix, grouped by domain
4. **Projects** — 3 featured (large cards → case study links) + 4 compact cards, with category tags
5. **Experience** — Sonelgaz internship, impact-focused bullets
6. **Education** — ESTIN + Baccalaureate
7. **Contact** — clean closing CTA

## Project Roster (7 projects)

### Featured (get full case study pages)

1. **Edge Predictive Maintenance** (`edge-pdm`) — TinyML anomaly detection on ESP32. *Strongest AI+IoT story.* Real metrics: 24.9 KB model, ~85ms inference, 95% accuracy, 100% edge (no cloud).
2. **Secure IoT Mini-Plant** (`mini-plant`) — mTLS IIoT stack, 8 containers. *Strongest infrastructure/security story.* 6 simulated devices, 5/5 automated security tests, <2s end-to-end latency.
3. **PLC Gateway** (`plc-gateway`) — Modbus→OPC UA industrial bridge. *Strongest OT/integration story.* 5-container pipeline, 50-100ms conversion latency, 9-panel Grafana dashboard, 221-line automated test harness.

### Compact cards on homepage (no case study page)

4. **ESP Cloud** — full-stack IoT platform (C++ firmware + Next.js, REST + WebSockets, hot-registerable hardware)
5. **Industrial Monitoring Stack** — MQTT→Node-RED→InfluxDB→Grafana, zero-config auto-provisioning
6. **Smart Parking IoT** *(new)* — ESP32 + 6× HC-SR04 ultrasonic + Next.js dashboard, transducer auto-detect
7. **Skydio X2 Simulator** *(new)* — MuJoCo drone physics sim with PID control, 6-DOF rigid body, X-quad mixing. *Shows AI/robotics breadth beyond IoT.*

Cards get category tags: `IoT` / `AI & Robotics` / `Full-stack` so breadth is visible at a glance.

## Visual System

### Palette (refined crimson)

- Primary accent: `#e11d48` (calibrated crimson — warmer, less harsh than current `#cc1a1a`)
- Deep variant: `#9f1239`
- Dark theme bg: `#0a0a0b` (warm-tinted near-black, replaces current `#0a0000` red-tinge)
- Light theme bg: `#fafafa` (kept)
- Single accent color used with discipline: CTAs, active states, key data points, hero detail. No second accent.

### Typography

- Geist Sans + Geist Mono (already wired, kept)
- Type scale: hero name `text-8xl`, section titles `text-4xl` with mono eyebrow labels, body `text-base/text-lg`
- Mono for technical details, metrics, tags — reinforces engineering identity

### Motion (framer-motion)

- Hero: blur-up entrance, staggered
- Sections: subtle scroll-reveal (opacity + y, `whileInView`, `once: true`)
- Nav: scroll-progress bar under the pill nav
- Cards: hover lift + accent border sweep
- Every motion serves focus — no excessive animation

### Layout

- Generous whitespace — sections `py-32` minimum
- `max-w-6xl` content width (kept)
- Sticky pill nav (kept) + scroll-progress indicator
- Dark mode primary (more premium for tech portfolios); light mode clean
- Fully responsive

## Case Study Page Structure

```
[Sticky mini-nav: back to projects | project title | next project]

HERO
  Project name (large)
  One-line tagline
  Tags row
  Hero image (from repo assets: dashboard-demo.gif, l.webp, etc.)

OVERVIEW
  Problem (the real-world need)
  Approach (how solved, key decisions)

ARCHITECTURE
  Data-flow diagram (styled text/ASCII or simple SVG)
  Components table (layer | tech | role)
  Key technical decisions (bulleted)

DEEP DIVE
  2-3 highlighted implementation details with code snippets

RESULTS
  Metrics grid (concrete numbers from each repo)
  Demo features list

LESSONS
  Challenges overcome (3-4 bullets)

FOOTER
  "View on GitHub" CTA
  Next project link
```

**Content source:** derived from repo READMEs + source structure (already explored). English marketing-grade prose, keep French quotes where they add authenticity, use the real metrics from each repo.

**Images:** copy `assets/` from each repo into `public/projects/[slug]/` and reference. The dashboards/GIFs are strong visual proof.

## Component Architecture

### Keep & refine

- `Navbar` — add scroll-progress bar, active-section highlight
- `Footer`, `LangToggle`, `ThemeProvider`, `ThemeToggle` — minor polish
- `ui/Badge`, `ui/Tag` — refine styling

### Keep & heavily redesign

- `sections/Hero` — cinematic version
- `sections/About`, `sections/Skills`, `sections/Projects`, `sections/Experience`, `sections/Education`, `sections/Contact`
- `ui/ProjectCard` — split into `FeaturedProjectCard` (large, links to case study) and `CompactProjectCard` (small)

### New components

- `components/sections/CaseStudyHero.tsx`
- `components/sections/CaseStudyOverview.tsx`
- `components/sections/CaseStudyArchitecture.tsx`
- `components/sections/CaseStudyDeepDive.tsx`
- `components/sections/CaseStudyResults.tsx`
- `components/sections/CaseStudyLessons.tsx`
- `ui/MetricCard` — for the results grid
- `ui/CodeBlock` — styled code snippets (zero-dep, styled `<pre>`)
- `ui/ArchitectureDiagram` — renders data-flow as styled text or simple SVG
- `ui/SectionProgress` — scroll progress indicator

## Data Model

Extend `src/i18n/messages/{en,fr}.json`:

- Homepage content: keep existing keys, refine copy
- `projects.featured`: array of 3 objects, each with:
  - `slug`, `title`, `tagline`, `tags`, `category`, `heroImage`
  - `problem`, `approach`
  - `architecture`: `{ flow, components: [{layer, tech, role}], decisions: [string] }`
  - `deepDive`: array of `{ title, body, code? }`
  - `results`: array of `{ label, value }`
  - `lessons`: array of strings
  - `demoFeatures`: array of strings
  - `github`
- `projects.other`: array of 4 compact objects with `title`, `description`, `tags`, `category`, `github`

## Tech Decisions

- **Keep:** Next.js 16 App Router, next-intl, framer-motion, Phosphor icons, Tailwind v4, Geist font. No new heavy dependencies.
- **Add:** nothing major. Styled `<pre>` for code blocks (zero deps).
- **Remove:** none — current deps are justified.
- **Deploy:** keep Netlify (existing `netlify.toml`).
- **i18n default:** change redirect from `/fr` → `/en`.
- **Content for 2 new projects:** add `parking-iot` and `skydio_x2` entries to both locale files + copy their assets.

## Non-Goals

- Blog / writing section (YAGNI — student won't maintain it)
- CMS (content stays in i18n JSON — simple, version-controlled)
- Analytics (out of scope for v1)
- Contact form backend (keep as mailto/email display — current form is non-functional and misleading)

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Case study content is marketing-heavy and could feel inflated | Use real metrics from repos; keep prose grounded; link to GitHub for verification |
| Translation burden for 3 case studies × 2 locales | Write EN first; FR translation can follow in a second pass (acceptable to ship EN-only case studies initially if needed) |
| `skydio_x2` repo has files staged-as-deleted in working tree | Use git HEAD content; restore with `git checkout HEAD -- .` before copying assets |
| Two repos have minor README/code drift (mini-plant Node-RED→bridge, plc-gateway Dockerfile filename) | Case study content reflects actual code, not README claims; note discrepancies honestly where relevant |
