import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  Code2,
  Cog,
  Compass,
  Cpu,
  FileText,
  GraduationCap,
  Layers,
  LineChart,
  Map as MapIcon,
  Network,
  Plane,
  Rocket,
  School,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

type PillarCategory = "Products" | "Future Skills" | "School Solutions";

interface Pillar {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category: PillarCategory;
  link?: string;
}

const PILLARS: Pillar[] = [
  {
    icon: FileText,
    title: "Career Passport",
    description:
      "A one-time purchase unlocking all three assessment reports, the Career Library, and your Student Dashboard — lifetime access, no renewals.",
    category: "Products",
    link: "/products",
  },
  {
    icon: Rocket,
    title: "Career Passport Pro",
    description:
      "Everything in Career Passport plus AI learning, coding, robotics, STEM kits, priority mentorship, and a premium dashboard.",
    category: "Products",
    link: "/products",
  },
  {
    icon: Brain,
    title: "Psychometric Assessment",
    description:
      "Three science-backed assessments — aptitude, personality, and interest — that map your natural strengths in about 100 minutes.",
    category: "Products",
    link: "/products",
  },
  {
    icon: Users,
    title: "Career Counselling",
    description:
      "One-on-one sessions with trained mentors who translate your report into a clear, personalised career direction.",
    category: "Products",
    link: "/products",
  },
  {
    icon: Building2,
    title: "Admission Support",
    description:
      "Shortlisting, application guidance, and documentation help for Indian colleges, universities, and professional programmes.",
    category: "Products",
    link: "/products",
  },
  {
    icon: Plane,
    title: "Study Abroad",
    description:
      "Country shortlisting, SOP and LOR guidance, visa prep, and scholarship mapping for 25+ international destinations.",
    category: "Products",
    link: "/products",
  },
  {
    icon: MapIcon,
    title: "Career Mapping",
    description:
      "A visual roadmap from where you are today to your chosen career — milestones, prerequisites, and decision points.",
    category: "Products",
    link: "/products",
  },
  {
    icon: Sparkles,
    title: "Future Skills",
    description:
      "Curated skill tracks for the next decade of work — AI literacy, data fluency, design thinking, and communication.",
    category: "Future Skills",
    link: "/future-skills",
  },
  {
    icon: Cog,
    title: "Computer Training",
    description:
      "Hands-on modules covering foundational computing, productivity tools, and the digital literacy every career now requires.",
    category: "Future Skills",
    link: "/future-skills",
  },
  {
    icon: Bot,
    title: "AI",
    description:
      "Practical AI literacy — how large language models work, prompt design, and using AI tools responsibly in your field.",
    category: "Future Skills",
    link: "/future-skills",
  },
  {
    icon: Code2,
    title: "Coding",
    description:
      "Project-based programming tracks from your first line of Python to building a portfolio-ready web or data project.",
    category: "Future Skills",
    link: "/future-skills",
  },
  {
    icon: Cpu,
    title: "Robotics",
    description:
      "Mechanical, electronic, and programming fundamentals through build-and-program kits that move, sense, and respond.",
    category: "Future Skills",
    link: "/future-skills",
  },
  {
    icon: Layers,
    title: "Career Labs",
    description:
      "Physical and virtual labs where students experiment with real tools, kits, and equipment across STEM disciplines.",
    category: "School Solutions",
    link: "/school-solutions",
  },
  {
    icon: School,
    title: "School Solutions",
    description:
      "Whole-school guidance programmes — assessments for every student, counsellor training, and parent engagement sessions.",
    category: "School Solutions",
    link: "/school-solutions",
  },
];

const CATEGORY_META: Record<
  PillarCategory,
  {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  Products: {
    label: "Products",
    description:
      "The core EduCareersPath offerings — assessments, counselling, admissions, and the Career Passport that ties them together.",
    icon: Rocket,
  },
  "Future Skills": {
    label: "Future Skills",
    description:
      "Skill tracks that prepare students for the next decade of work — AI, coding, robotics, and digital literacy.",
    icon: Sparkles,
  },
  "School Solutions": {
    label: "School Solutions",
    description:
      "Whole-school programmes that bring assessments, labs, and counsellor training to your campus.",
    icon: School,
  },
};

const CATEGORY_ORDER: PillarCategory[] = [
  "Products",
  "Future Skills",
  "School Solutions",
];

const ECOSYSTEM_STATS = [
  { value: "14", label: "Ecosystem pillars" },
  { value: "10,000+", label: "Students guided" },
  { value: "500+", label: "Partner institutions" },
  { value: "25+", label: "Countries" },
];

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;
  const staggerClass = `stagger-${Math.min(index + 1, 10)}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.5) }}
      className={`animate-fade-in-up-reveal ${staggerClass}`}
    >
      <div className="glass-card hover-lift group flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-6" aria-hidden />
          </span>
          <StatusBadge
            tone="muted"
            className="text-[10px] uppercase tracking-wide"
          >
            {pillar.category}
          </StatusBadge>
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
          {pillar.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {pillar.description}
        </p>
        {pillar.link ? (
          <Button
            asChild
            variant="link"
            className="mt-4 h-auto p-0 text-sm font-medium text-primary"
            data-ocid={`ecosystem.pillar.link.${pillar.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <Link to={pillar.link}>
              Explore {pillar.category.toLowerCase()}
              <ArrowRight
                className="size-4 transition-smooth group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Button>
        ) : null}
      </div>
    </motion.div>
  );
}

export function OurEcosystemPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div
          className="absolute inset-0 -z-10 bg-gradient-primary opacity-[0.04]"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            eyebrow="The EduCareersPath ecosystem"
            title="One platform, fourteen connected pillars"
            description="From psychometric assessments to robotics labs, every part of EduCareersPath is designed to feed the next — so a student's journey from self-discovery to a working career is one continuous path, not a series of disconnected services."
            align="center"
          >
            <CTAButton
              asChild
              tone="primary"
              data-ocid="ecosystem.start_button"
            >
              <Link to="/assessments">Start with an assessment</Link>
            </CTAButton>
            <CTAButton
              asChild
              tone="outline"
              data-ocid="ecosystem.how_it_works_button"
            >
              <Link to="/how-it-works">See how it works</Link>
            </CTAButton>
          </PageHeader>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {ECOSYSTEM_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillar groups */}
      {CATEGORY_ORDER.map((category, groupIndex) => {
        const meta = CATEGORY_META[category];
        const MetaIcon = meta.icon;
        const pillars = PILLARS.filter((p) => p.category === category);
        const altBg = groupIndex % 2 === 1;
        return (
          <section
            key={category}
            className={altBg ? "bg-muted/30" : "bg-background"}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow={meta.label}
                title={`${meta.label} pillars`}
                description={meta.description}
                align="center"
                className="mb-10"
              >
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MetaIcon className="size-4" aria-hidden />
                  </span>
                  <span>
                    {pillars.length} pillar{pillars.length === 1 ? "" : "s"} in
                    this group
                  </span>
                </div>
              </SectionHeading>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pillars.map((pillar, i) => (
                  <PillarCard key={pillar.title} pillar={pillar} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing CTA */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="glass-tinted flex flex-col items-center gap-6 rounded-2xl p-10 text-center md:p-14">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Network className="size-7" aria-hidden />
            </span>
            <h2 className="max-w-2xl font-display text-2xl font-bold text-foreground md:text-3xl">
              The pillars work better together
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Start with a psychometric assessment, follow it with counselling,
              build future skills, and finish with placement-ready experience —
              all inside one connected ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <CTAButton
                asChild
                tone="primary"
                size="lg"
                data-ocid="ecosystem.cta_assessments"
              >
                <Link to="/assessments">Begin your assessment</Link>
              </CTAButton>
              <CTAButton
                asChild
                tone="outline"
                size="lg"
                data-ocid="ecosystem.cta_contact"
              >
                <Link to="/contact">Talk to our team</Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
