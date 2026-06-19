import { notFound } from "next/navigation";
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
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "fr"]) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const msgs = messagesMap[locale as keyof typeof messagesMap] ?? fr;
  const featured = (msgs.projects as { featured: Array<{ slug: string; title: string; tagline: string }> }).featured;
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
  const featured = (msgs.projects as { featured: Record<string, unknown>[] }).featured;
  const index = featured.findIndex((p) => p.slug === slug);

  if (index === -1 || !slugs.includes(slug)) {
    notFound();
  }

  const project = featured[index] as Record<string, unknown> & {
    title: string; tagline: string; tags: string[]; category: string;
    heroImage?: string; github: string; problem: string; approach: string;
    architecture: { flow: string[]; components: { layer: string; tech: string; role: string }[]; decisions: string[] };
    deepDive: { title: string; body: string; code?: string; language?: string }[];
    results: { label: string; value: string }[];
    demoFeatures: string[];
    lessons: string[];
  };
  const nextProject = featured[(index + 1) % featured.length] as { slug: string; title: string };

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
