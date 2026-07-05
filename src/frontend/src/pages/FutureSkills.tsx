import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe,
  type LucideIcon,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { motion } from "motion/react";

interface Skill {
  icon: LucideIcon;
  title: string;
  description: string;
  level: "Foundation" | "Intermediate" | "Advanced";
}

const SKILLS: Skill[] = [
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    description:
      "From prompting to building — students learn how generative and predictive AI work, where they fail, and how to ship a small model project end to end.",
    level: "Advanced",
  },
  {
    icon: Code2,
    title: "Coding",
    description:
      "A project-first curriculum across Python and JavaScript that builds real portfolios — calculators, games, web apps — not just syntax drills.",
    level: "Foundation",
  },
  {
    icon: Cpu,
    title: "Robotics",
    description:
      "Sensors, motors, and autonomous logic. Students move from breadboard basics to a robot that navigates a course on its own.",
    level: "Intermediate",
  },
  {
    icon: Sparkles,
    title: "STEM",
    description:
      "Integrated science, technology, engineering, and maths challenges that turn textbook concepts into buildable, testable prototypes.",
    level: "Foundation",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Literacy",
    description:
      "The essentials every student needs — file systems, online safety, evaluating sources, and using productivity tools without the noise.",
    level: "Foundation",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "HTML, CSS, and modern JavaScript with a focus on shipping — students deploy a real, responsive site by the end of the module.",
    level: "Intermediate",
  },
  {
    icon: Terminal,
    title: "Python",
    description:
      "The most-requested first language — data, automation, and scripting projects that make Python click for absolute beginners.",
    level: "Foundation",
  },
  {
    icon: Code2,
    title: "Java",
    description:
      "Object-oriented programming with Java — the language behind AP Computer Science and most Indian engineering entrance syllabi.",
    level: "Intermediate",
  },
  {
    icon: Cloud,
    title: "Cloud Basics",
    description:
      "What the cloud actually is, how services like storage and compute work, and a hands-on deploy to a free-tier provider.",
    level: "Intermediate",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    description:
      "Threats, defenses, and the habits that keep students safe online — from password hygiene to spotting phishing and social engineering.",
    level: "Intermediate",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description:
      "Collect, clean, visualise, and reason about data using spreadsheets and Python — the skill behind every modern business decision.",
    level: "Advanced",
  },
];

const LEVEL_TONE: Record<Skill["level"], "default" | "warning" | "info"> = {
  Foundation: "default",
  Intermediate: "info",
  Advanced: "warning",
};

const STATS = [
  { value: "11", label: "Future-skill tracks" },
  { value: "3 levels", label: "Foundation → Advanced" },
  { value: "Project-first", label: "Build a real portfolio" },
  { value: "Mentor-backed", label: "Reviewed by practitioners" },
];

const PATHWAYS = [
  {
    title: "The Builder track",
    body: "Coding → Web Development → Python → Cloud Basics. For students who want to ship software.",
    icon: Code2,
  },
  {
    title: "The Analyst track",
    body: "Digital Literacy → Data Analytics → Python → AI. For students drawn to data and decisions.",
    icon: BarChart3,
  },
  {
    title: "The Engineer track",
    body: "STEM → Robotics → Coding → Cyber Security. For students who like hardware and systems.",
    icon: Cpu,
  },
];

export function FutureSkillsPage() {
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
            eyebrow="Skills for the next decade"
            title="Future Skills that compound for life"
            description="Eleven tracks across AI, coding, robotics, data, and security — each one project-first, mentor-reviewed, and built to stack into a portfolio students carry into college and work."
            align="center"
          >
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="future_skills.explore_button"
            >
              <Link to="/school-solutions">Bring to your school</Link>
            </CTAButton>
            <CTAButton
              asChild
              tone="outline"
              size="lg"
              data-ocid="future_skills.assess_button"
            >
              <Link to="/assessments">Find your fit assessment</Link>
            </CTAButton>
          </PageHeader>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Eleven tracks"
          title="Pick a skill, build a portfolio"
          description="Every track ships with hands-on projects, mentor code reviews, and a shareable portfolio piece. Mix and match across foundation, intermediate, and advanced levels."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className="glass-card hover-lift group flex h-full flex-col gap-4 p-6"
              data-ocid={`future_skills.skill_card.${i + 1}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="size-6" aria-hidden />
                </span>
                <StatusBadge tone={LEVEL_TONE[s.level]}>{s.level}</StatusBadge>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
              <Link
                to="/contact"
                data-ocid={`future_skills.learn_link.${i + 1}`}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
              >
                Learn {s.title}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Pathways */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Suggested pathways"
            title="Stack skills into a direction"
            description="Not sure where to start? These three pathways sequence our tracks into a coherent direction — students can follow one or branch out."
            align="center"
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {PATHWAYS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card hover-lift flex h-full flex-col gap-3 p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-gradient-accent text-accent-foreground">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-strong flex flex-col items-center gap-6 rounded-2xl px-6 py-12 text-center md:px-12">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground">
            <Sparkles className="size-7" aria-hidden />
          </span>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Build future skills at your school
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our Future Skills tracks roll into the School Solutions programme
              — bring one track to a club or the full suite across grades.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="future_skills.contact_button"
            >
              <Link to="/contact">Talk to our team</Link>
            </CTAButton>
            <CTAButton
              asChild
              tone="outline"
              size="lg"
              data-ocid="future_skills.school_solutions_button"
            >
              <Link to="/school-solutions">View school solutions</Link>
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
