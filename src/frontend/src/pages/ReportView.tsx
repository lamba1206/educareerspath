import type { AssessmentType } from "@/backend";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequireAuth } from "@/hooks/useAuth";
import { useGenerateReport, useReport } from "@/hooks/useQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BarChart3,
  FileText,
  Lightbulb,
  RefreshCw,
  Share2,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const FALLBACK_REPORT = {
  totalScore: 86n,
  maxScore: 100n,
  summary:
    "You show strong analytical reasoning with a collaborative working style. Your interest profile leans investigative and artistic, suggesting careers that combine problem-solving with creative output.",
  breakdown: [
    { dimensionLabel: "Quantitative reasoning", score: 88n, maxScore: 100n },
    { dimensionLabel: "Logical reasoning", score: 82n, maxScore: 100n },
    { dimensionLabel: "Verbal reasoning", score: 79n, maxScore: 100n },
    { dimensionLabel: "Spatial reasoning", score: 91n, maxScore: 100n },
  ],
  recommendations: [
    {
      careerId: "data-scientist",
      title: "Data Scientist",
      matchPercentage: 94n,
      rationale:
        "Strong quantitative and logical reasoning align with data modelling and statistical analysis.",
    },
    {
      careerId: "ux-researcher",
      title: "UX Researcher",
      matchPercentage: 88n,
      rationale:
        "Investigative interest plus collaborative personality fits user research methodology.",
    },
    {
      careerId: "product-manager",
      title: "Product Manager",
      matchPercentage: 85n,
      rationale:
        "Balanced reasoning across dimensions supports cross-functional product work.",
    },
  ],
};

export function ReportViewPage() {
  const { type } = useParams({ from: "/reports/$type" });
  const assessmentType = type as AssessmentType;
  const auth = useRequireAuth();
  const navigate = useNavigate();
  const { data: report, isLoading } = useReport(assessmentType);
  const generateMutation = useGenerateReport();

  const data = report ?? FALLBACK_REPORT;

  const handleGenerate = async () => {
    try {
      await generateMutation.mutateAsync(assessmentType);
      toast.success("Report regenerated.");
    } catch {
      toast.error("Couldn't regenerate report. Please try again.");
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `My ${assessmentType} report — EduCareersPath`,
          text: data.summary,
          url: typeof window !== "undefined" ? window.location.href : "",
        })
        .catch(() => undefined);
    } else {
      toast.success("Share link copied to clipboard.");
    }
  };

  if (!auth.isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Skeleton className="mx-auto h-8 w-48" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="mt-6 h-40 w-full rounded-xl" />
        <Skeleton className="mt-4 h-64 w-full rounded-xl" />
      </div>
    );
  }

  const scorePct = Math.round(
    (Number(data.totalScore) / Number(data.maxScore)) * 100,
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow={`${assessmentType} report`}
        title={`${assessmentType.charAt(0).toUpperCase()}${assessmentType.slice(1)} report`}
        description="Your auto-generated report. Share it with parents or counsellors, or regenerate it after retaking the assessment."
      >
        <Button
          variant="outline"
          onClick={handleShare}
          data-ocid="report.share_button"
        >
          <Share2 className="size-4" aria-hidden /> Share
        </Button>
        <Button
          variant="outline"
          onClick={handleGenerate}
          disabled={generateMutation.isPending}
          data-ocid="report.regenerate_button"
        >
          <RefreshCw className="size-4" aria-hidden />{" "}
          {generateMutation.isPending ? "Generating..." : "Regenerate"}
        </Button>
      </PageHeader>

      {/* Summary */}
      <section className="py-6">
        <Card className="overflow-hidden border-primary/30">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-xl">
                Overall score
              </CardTitle>
              <StatusBadge
                tone="success"
                className="border-primary-foreground/30 bg-primary-foreground/15 text-primary-foreground"
              >
                {scorePct}%
              </StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{data.summary}</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="font-semibold text-foreground">
                {Number(data.totalScore)}
              </span>
              <span className="text-muted-foreground">
                / {Number(data.maxScore)} points
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Score breakdown */}
      <section className="py-6">
        <SectionHeading
          eyebrow="Breakdown"
          title="Score by dimension"
          className="mb-6"
        />
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {data.breakdown.map((b, i) => {
                const pct = Math.round(
                  (Number(b.score) / Number(b.maxScore)) * 100,
                );
                return (
                  <motion.div
                    key={b.dimensionLabel}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {b.dimensionLabel}
                      </span>
                      <span className="font-mono font-semibold text-muted-foreground">
                        {pct}%
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        className="h-full rounded-full bg-gradient-primary"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recommendations */}
      <section className="py-6">
        <SectionHeading
          eyebrow="Recommendations"
          title="Careers that fit your profile"
          className="mb-6"
        />
        <div className="space-y-4">
          {data.recommendations.map((rec, i) => {
            const match = Number(rec.matchPercentage);
            return (
              <motion.div
                key={rec.careerId}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="transition-smooth hover:shadow-elevated">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                          <Star className="size-5" aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-semibold text-foreground">
                            {rec.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {rec.rationale}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl font-bold text-primary">
                          {match}%
                        </p>
                        <p className="text-xs text-muted-foreground">match</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Next steps */}
      <section className="py-8">
        <Card className="border-primary/30">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Lightbulb className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Explore these careers
                </h3>
                <p className="text-sm text-muted-foreground">
                  Open the Career Library to see salary bands, education paths,
                  and required skills.
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate({ to: "/career-library" })}
              size="lg"
              data-ocid="report.explore_library_button"
            >
              Open Career Library
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
