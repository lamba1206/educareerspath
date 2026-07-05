import { AssessmentType } from "@/backend";
import { AssessmentCard } from "@/components/AssessmentCard";
import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAssessmentDefinitions,
  useAssessmentProgress,
} from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Brain, Heart, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const FALLBACK_DEFINITIONS = [
  {
    title: "Aptitude Assessment",
    assessmentType: AssessmentType.aptitude,
    description:
      "Quantitative, logical, and verbal reasoning that maps your natural strengths.",
    totalQuestions: 40n,
    durationMinutes: 45n,
  },
  {
    title: "Personality Assessment",
    assessmentType: AssessmentType.personality,
    description:
      "Big Five traits that reveal how you work, lead, and collaborate.",
    totalQuestions: 30n,
    durationMinutes: 30n,
  },
  {
    title: "Interest Assessment",
    assessmentType: AssessmentType.interest,
    description:
      "Holland Code inventory that surfaces the careers you'd actually enjoy.",
    totalQuestions: 25n,
    durationMinutes: 25n,
  },
];

const ECOSYSTEM_LINKS = [
  {
    icon: Brain,
    title: "Feeds the Career Library",
    body: "Your results rank 3,000+ careers by match percentage — no manual filtering needed.",
  },
  {
    icon: Heart,
    title: "Feeds college & exam matches",
    body: "Personality + interest profiles shortlist the colleges and entrance exams that fit you.",
  },
  {
    icon: Lightbulb,
    title: "Feeds scholarship eligibility",
    body: "Aptitude and interest signals surface scholarships aligned to your likely field of study.",
  },
];

export function AssessmentsPage() {
  const navigate = useNavigate();
  const { data: definitions, isLoading } = useAssessmentDefinitions();
  const aptitudeProgress = useAssessmentProgress(AssessmentType.aptitude);
  const personalityProgress = useAssessmentProgress(AssessmentType.personality);
  const interestProgress = useAssessmentProgress(AssessmentType.interest);

  const progressMap = {
    [AssessmentType.aptitude]: aptitudeProgress.data,
    [AssessmentType.personality]: personalityProgress.data,
    [AssessmentType.interest]: interestProgress.data,
  };

  const list =
    definitions && definitions.length > 0 ? definitions : FALLBACK_DEFINITIONS;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Assessments"
        title="The self-discovery layer of the ecosystem"
        description="Three assessments — aptitude (45 min), personality (30 min), and interest (25 min) — that power everything else. Take them in any order, pause anytime with save-and-resume, and get an auto-generated report the moment you finish."
        align="center"
      >
        <CTAButton
          asChild
          tone="primary"
          size="lg"
          data-ocid="assessments.start_first_button"
        >
          <a href="#assessment-list">Start your first assessment</a>
        </CTAButton>
      </PageHeader>

      <section id="assessment-list" className="py-8">
        <SectionHeading
          eyebrow="Choose an assessment"
          title="Pick where you'd like to start"
          align="center"
          className="mb-10"
        />
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-3">
            {["a", "b", "c"].map((k) => (
              <Skeleton
                key={`skeleton-${k}`}
                className="h-72 w-full rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {list.map((def, i) => (
              <AssessmentCard
                key={def.assessmentType}
                definition={def}
                progress={progressMap[def.assessmentType] ?? null}
                index={i}
                onStart={(type) =>
                  navigate({ to: "/assessments/$type", params: { type } })
                }
                onViewReport={(type) =>
                  navigate({ to: "/reports/$type", params: { type } })
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* How assessments connect to the ecosystem */}
      <section className="py-8">
        <SectionHeading
          eyebrow="Connected, not standalone"
          title="Where your results flow"
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {ECOSYSTEM_LINKS.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <l.icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                    {l.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {l.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-8">
        <SectionHeading
          eyebrow="After you finish"
          title="What lands in your dashboard"
          align="center"
          className="mb-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6">
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span
                  className="mt-1.5 size-1.5 rounded-full bg-primary"
                  aria-hidden
                />{" "}
                A score breakdown across the assessment's dimensions
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1.5 size-1.5 rounded-full bg-primary"
                  aria-hidden
                />{" "}
                A trait or interest profile, written in plain English
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1.5 size-1.5 rounded-full bg-primary"
                  aria-hidden
                />{" "}
                Ranked career recommendations with match percentages
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1.5 size-1.5 rounded-full bg-primary"
                  aria-hidden
                />{" "}
                A shareable link you can send to parents or counsellors
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Ecosystem nudge */}
      <section className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-accent/30 bg-gradient-subtle">
            <CardContent className="flex flex-col items-center gap-3 py-8 text-center md:flex-row md:justify-between md:text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                  <Sparkles className="size-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Finish all three to unlock the full ecosystem
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete aptitude, personality, and interest to activate
                    career, college, exam, and scholarship matches in your
                    dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
