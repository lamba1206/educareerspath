import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Compass,
  Eye,
  Heart,
  Layers,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { value: "10,000+", label: "Students guided" },
  { value: "3,000+", label: "Career options mapped" },
  { value: "10,000+", label: "Indian colleges" },
  { value: "1,400+", label: "Entrance exams tracked" },
];

const VALUES = [
  {
    icon: Network,
    title: "Integrated, not isolated",
    body: "Assessments, careers, colleges, exams, scholarships, and videos live on one connected platform — not scattered across five separate tools.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence over opinion",
    body: "We use validated psychometric frameworks (Big Five, Holland Code, classical aptitude batteries) and update norms for Indian cohorts.",
  },
  {
    icon: Heart,
    title: "Affordable by design",
    body: "₹3,999 for a lifetime Career Passport. No subscriptions, no upsells hidden behind a paywall, no per-report fees.",
  },
  {
    icon: Lightbulb,
    title: "Transparent reports",
    body: "You own your data. Reports are clear, shareable, and explain why a career was recommended — not just that it was.",
  },
  {
    icon: Target,
    title: "Outcomes-focused",
    body: "We measure success by students who enrol in a course that fits them — not by assessments taken or pages viewed.",
  },
  {
    icon: Users,
    title: "Human-in-the-loop",
    body: "Edge cases get a real counsellor. Algorithms propose, humans review, students decide.",
  },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Founded in Delhi",
    body: "Started with a single aptitude test and 40 students from one school — the first node of the ecosystem.",
  },
  {
    year: "2022",
    title: "Three assessments live",
    body: "Added personality and interest inventories; crossed 1,000 students. The assessment layer of the ecosystem took shape.",
  },
  {
    year: "2023",
    title: "Career Passport + Library launched",
    body: "One-time purchase model replaced per-report fees. 3,000+ careers and 10,000+ colleges added — the discovery layer went live.",
  },
  {
    year: "2024",
    title: "Full ecosystem live",
    body: "1,400+ entrance exams, scholarships, career videos, and an admissions network across 25+ countries connected into one platform.",
  },
];

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="About us"
        title="One ecosystem for every career decision"
        description="EduCareersPath is an integrated platform — assessments, careers, colleges, exams, scholarships, and videos connected end-to-end, so a student never has to stitch five tools together to make one decision."
      />

      {/* Who We Are */}
      <section className="grid items-center gap-10 py-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Layers className="size-3.5" aria-hidden /> Who we are
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
            An integrated career ecosystem, not a counselling service
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              EduCareersPath is a single platform that connects every step of a
              career decision — from understanding yourself to enrolling in a
              course that fits. We are not a coaching institute, a portal of
              forms, or a one-off test provider.
            </p>
            <p>
              We bring assessments, a 3,000+ career library, 10,000+ Indian
              colleges, 8,000+ universities, 1,400+ entrance exams,
              scholarships, and career videos onto one connected surface — so
              the data flows from one step to the next without a student ever
              re-entering it.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          {STATS.map((s, i) => (
            <Card
              key={s.label}
              className={
                i % 2 === 1 ? "bg-gradient-primary text-primary-foreground" : ""
              }
            >
              <CardContent className="pt-6 text-center">
                <p
                  className={`font-display text-3xl font-bold ${i % 2 === 1 ? "text-primary-foreground" : "text-primary"}`}
                >
                  {s.value}
                </p>
                <p
                  className={`mt-1 text-sm ${i % 2 === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {s.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Mission + Vision */}
      <section className="grid gap-5 py-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full border-primary/20">
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Target className="size-5" aria-hidden />
              </div>
              <CardTitle className="font-display text-lg">
                Our mission
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                To make every Indian student's career decision grounded in their
                own aptitude, personality, and interests — and to give them the
                full ecosystem of careers, colleges, exams, and scholarships to
                act on it.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full border-accent/30">
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                <Eye className="size-5" aria-hidden />
              </div>
              <CardTitle className="font-display text-lg">Our vision</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                A world where no student picks a stream, course, or country
                because of marks alone — and where the entire path from
                self-discovery to enrolment lives on one platform.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </section>

      {/* Founder + Our Story */}
      <section className="grid items-start gap-10 py-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            <Sparkles className="size-3.5" aria-hidden /> The founder
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
            A question that started it all
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              In 2021, our founder was volunteering at a government school in
              Delhi when a Class 12 student asked a question that stopped him
              cold:{" "}
              <em>
                "Sir, I scored 91% — should I do engineering or commerce?"
              </em>{" "}
              The marks told him nothing about what he'd actually be good at.
            </p>
            <p>
              That question exposed a gap: students had marks, but no
              self-knowledge; they had portals, but no connected path. The
              answer wasn't another test — it was an ecosystem that connected
              self-discovery to action.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Compass className="size-3.5" aria-hidden /> Our story
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
            From one test to a full ecosystem
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              We built the first aptitude assessment that summer. Personality
              and interest inventories followed. By 2023 we'd replaced
              per-report fees with a single ₹3,999 Career Passport so families
              could afford the full picture, not half of it.
            </p>
            <p>
              Then we kept building outward — careers, colleges, exams,
              scholarships, videos — until a student could move from "who am I?"
              to "where do I enrol?" without ever leaving the platform. Today,
              10,000+ students have used EduCareersPath to make a decision that
              used to be made by marks, marks, and more marks.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-8">
        <SectionHeading
          eyebrow="Milestones"
          title="From 40 students to a full ecosystem"
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <span className="font-display text-sm font-bold text-primary">
                    {t.year}
                  </span>
                  <CardTitle className="font-display text-base">
                    {t.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {t.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why EduCareersPath — Values */}
      <section className="py-8">
        <SectionHeading
          eyebrow="Why EduCareersPath"
          title="Six values that shape every decision"
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <v.icon className="size-5" aria-hidden />
                  </div>
                  <CardTitle className="font-display text-base">
                    {v.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {v.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <CTAButton
          asChild
          tone="primary"
          size="lg"
          data-ocid="about.start_button"
        >
          <Link to="/assessments">Start your assessments</Link>
        </CTAButton>
      </section>
    </div>
  );
}
