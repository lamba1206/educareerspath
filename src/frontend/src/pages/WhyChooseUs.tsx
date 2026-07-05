import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ClipboardCheck,
  Compass,
  GraduationCap,
  LayoutDashboard,
  type LucideIcon,
  Map as MapIcon,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: ClipboardCheck,
    title: "Scientific Assessment",
    description:
      "Three psychometric assessments grounded in decades of research — aptitude, personality, and interest — validated for Indian students in Class 10 and Class 12.",
  },
  {
    icon: Award,
    title: "Certified Career Analysts",
    description:
      "Every report is reviewed by certified career analysts who interpret edge cases and add the human judgement no algorithm can replace.",
  },
  {
    icon: MapIcon,
    title: "Personalized Career Roadmaps",
    description:
      "Get a step-by-step roadmap from where you are today to the career you want — with milestones, courses, and decision points mapped to your timeline.",
  },
  {
    icon: LayoutDashboard,
    title: "One Dashboard",
    description:
      "Assessments, reports, career library, and admissions tracking all live in a single dashboard. No juggling tabs, no lost progress, no scattered PDFs.",
  },
  {
    icon: Sparkles,
    title: "Future Skills",
    description:
      "Stay ahead with curated guidance on emerging fields — AI, green energy, robotics, and design — so your career choice stays relevant for the next decade.",
  },
  {
    icon: GraduationCap,
    title: "Admission Support",
    description:
      "From shortlisting colleges to SOP reviews and abroad applications, our admissions team walks every family through the paperwork end to end.",
  },
  {
    icon: Compass,
    title: "Industry Guidance",
    description:
      "Real practitioners from 500+ partner institutions share what a day in their role actually looks like — beyond the brochure and the salary band.",
  },
  {
    icon: Wrench,
    title: "Practical Learning",
    description:
      "Workshops, robotics demos, and hands-on sessions turn career theory into lived experience, so students choose with evidence, not guesswork.",
  },
];

const COMMITMENTS = [
  {
    icon: Users,
    title: "Student-first, always",
    body: "Every recommendation starts from the student's assessment data — never from a partner's quota or a commission.",
  },
  {
    icon: BookOpen,
    title: "Transparent methodology",
    body: "Our scoring rubrics, career matching logic, and report structure are documented and shared with families upfront.",
  },
  {
    icon: Compass,
    title: "Outcome-focused",
    body: "We measure success by clarity and confidence at decision time — not by assessments sold or reports generated.",
  },
];

export function WhyChooseUsPage() {
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
            eyebrow="Why Choose Us"
            title="Eight reasons families trust EduCareersPath"
            description="Career counselling is a once-in-a-lifetime decision. We built EduCareersPath so that decision is grounded in science, guided by humans, and affordable for every Indian family."
            align="center"
          >
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="whychooseus.start_assessment_button"
            >
              <Link to="/assessments">Start your assessments</Link>
            </CTAButton>
            <CTAButton
              asChild
              tone="outline"
              size="lg"
              data-ocid="whychooseus.talk_to_us_button"
            >
              <Link to="/contact">Talk to a counsellor</Link>
            </CTAButton>
          </PageHeader>
        </div>
      </section>

      {/* Differentiator grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What sets us apart"
          title="Eight differentiators, one platform"
          description="Each capability below is built into every EduCareersPath plan — no upsells, no gated tiers."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className={`glass-card hover-lift animate-fade-in-up-reveal stagger-${
                  (i % 8) + 1
                } flex h-full flex-col gap-3 p-6`}
                data-ocid={`whychooseus.card.${i + 1}`}
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {d.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our commitments"
            title="Principles we don't compromise on"
            align="center"
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {COMMITMENTS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card hover-lift-sm flex h-full flex-col gap-3 p-6"
                  data-ocid={`whychooseus.commitment.${i + 1}`}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-card flex flex-col items-center gap-5 px-6 py-12 text-center md:px-12">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Ready to find your path?
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Start with three assessments, get an auto-generated report, and
            explore 500+ careers — all in one dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="whychooseus.cta_start_button"
            >
              <Link to="/assessments">Start your assessments</Link>
            </CTAButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              data-ocid="whychooseus.cta_explore_button"
            >
              <Link to="/career-library">Explore the Career Library</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
