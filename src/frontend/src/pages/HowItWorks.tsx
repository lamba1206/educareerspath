import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Bot,
  Brain,
  ClipboardList,
  FileText,
  GraduationCap,
  LineChart,
  Map as MapIcon,
  Sparkles,
  Target,
  UserCheck,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

interface TimelineStep {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const STEPS: TimelineStep[] = [
  {
    number: "01",
    icon: UserCheck,
    title: "Register",
    description:
      "Create your EduCareersPath account with an email or Internet Identity. Your profile, assessments, and reports all live in one secure dashboard.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Assessment",
    description:
      "Take three science-backed assessments — aptitude, personality, and interest — about 100 minutes total, pausable and resumable anytime.",
  },
  {
    number: "03",
    icon: Bot,
    title: "AI Analysis",
    description:
      "Our engine analyses your responses against psychometric models and surfaces the careers that genuinely fit your profile.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Career Report",
    description:
      "A clear, shareable report lands in your dashboard — score breakdowns, trait profiles, and ranked career recommendations.",
  },
  {
    number: "05",
    icon: UserCheck,
    title: "Counselling",
    description:
      "Meet a trained mentor who walks you through the report, answers your questions, and helps you weigh your top career options.",
  },
  {
    number: "06",
    icon: MapIcon,
    title: "Career Roadmap",
    description:
      "Together you build a visual roadmap from where you are today to your chosen career — milestones, prerequisites, and decision points.",
  },
  {
    number: "07",
    icon: GraduationCap,
    title: "Admissions",
    description:
      "Shortlist colleges and courses, prepare applications, and get documentation guidance for Indian and international destinations.",
  },
  {
    number: "08",
    icon: Wrench,
    title: "Skill Development",
    description:
      "Build the skills your roadmap requires — from foundational computer training to AI, coding, and robotics tracks in Passport Pro.",
  },
  {
    number: "09",
    icon: Target,
    title: "Placement",
    description:
      "Connect with opportunities, prepare your portfolio, and step into your chosen career with a clear, evidence-backed direction.",
  },
];

const PHASES = [
  {
    label: "Discover",
    steps: ["01", "02", "03", "04"],
    description: "Understand yourself through assessments and AI analysis.",
  },
  {
    label: "Decide",
    steps: ["05", "06", "07"],
    description:
      "Counselling, roadmap, and admissions turn insight into a plan.",
  },
  {
    label: "Develop",
    steps: ["08", "09"],
    description: "Build the skills and connections that land the career.",
  },
];

function TimelineRow({
  step,
  index,
}: {
  step: TimelineStep;
  index: number;
}) {
  const Icon = step.icon;
  const isLeft = index % 2 === 0;
  const staggerClass = `stagger-${Math.min(index + 1, 10)}`;
  return (
    <div
      className={cn(
        "relative flex animate-timeline-reveal",
        staggerClass,
        "flex-col gap-4 md:flex-row md:items-center md:gap-8",
      )}
    >
      {/* Node */}
      <div className="absolute left-6 top-0 hidden md:left-1/2 md:block md:-translate-x-1/2">
        <span className="flex size-12 items-center justify-center rounded-full border-2 border-primary bg-card text-primary shadow-sm">
          <Icon className="size-5" aria-hidden />
        </span>
      </div>

      {/* Mobile node (inline) */}
      <div className="flex items-center gap-3 md:hidden">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="font-display text-2xl font-bold text-primary/30">
          {step.number}
        </span>
      </div>

      {/* Card */}
      <div
        className={cn(
          "md:w-1/2",
          isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12",
        )}
      >
        <div className="glass-card hover-lift-sm p-6">
          <div className="flex items-center gap-2 md:hidden">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {step.title}
            </h3>
          </div>
          <div
            className={cn(
              "hidden items-center gap-2 md:flex",
              isLeft ? "justify-end" : "justify-start",
            )}
          >
            <span className="font-display text-2xl font-bold text-primary/30">
              {step.number}
            </span>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {step.title}
            </h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksPage() {
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
            eyebrow="How EduCareersPath works"
            title="Nine steps from assessment to placement"
            description="A guided, evidence-backed journey — register, take three assessments, let our AI analyse your profile, and follow a clear roadmap all the way to your first role."
            align="center"
          >
            <CTAButton
              asChild
              tone="primary"
              data-ocid="howitworks.start_button"
            >
              <Link to="/assessments">Start your assessment</Link>
            </CTAButton>
            <CTAButton
              asChild
              tone="outline"
              data-ocid="howitworks.ecosystem_button"
            >
              <Link to="/our-ecosystem">Explore the ecosystem</Link>
            </CTAButton>
          </PageHeader>
        </div>
      </section>

      {/* Phases overview */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="size-5" aria-hidden />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {phase.label}
                    </h3>
                    <StatusBadge tone="muted" className="text-[10px]">
                      Steps {phase.steps[0]}–
                      {phase.steps[phase.steps.length - 1]}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The journey"
            title="From register to placement"
            description="Each step builds on the last. Hover a card to lift it, and watch the steps reveal in sequence as you scroll."
            align="center"
            className="mb-12"
          />
          {/* Center line (desktop) */}
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/40 to-accent md:block"
              aria-hidden
            />
            {/* Mobile vertical line */}
            <div
              className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/40 to-accent md:hidden"
              aria-hidden
            />
            <div className="flex flex-col gap-8">
              {STEPS.map((step, i) => (
                <TimelineRow key={step.number} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="glass-tinted flex flex-col items-center gap-6 rounded-2xl p-10 text-center md:p-14">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LineChart className="size-7" aria-hidden />
            </span>
            <h2 className="max-w-2xl font-display text-2xl font-bold text-foreground md:text-3xl">
              Ready to start step one?
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Registration is free and takes a minute. Your first assessment can
              begin right away — pause and resume whenever you like.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <CTAButton
                asChild
                tone="primary"
                size="lg"
                data-ocid="howitworks.cta_register"
              >
                <Link to="/sign-in">Register now</Link>
              </CTAButton>
              <CTAButton
                asChild
                tone="outline"
                size="lg"
                data-ocid="howitworks.cta_products"
              >
                <Link to="/products">Compare Passports</Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
