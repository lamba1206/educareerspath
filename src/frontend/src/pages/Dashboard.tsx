import { AssessmentType } from "@/backend";
import { LockedOverlay } from "@/components/LockedOverlay";
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
import { useRequirePassport } from "@/hooks/useAuth";
import {
  useAssessmentProgress,
  useGenerateReport,
  useInvoices,
  useReports,
} from "@/hooks/useQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  LifeBuoy,
  Lock,
  PlayCircle,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const ASSESSMENT_META = [
  { type: AssessmentType.aptitude, title: "Aptitude", duration: "45 min" },
  {
    type: AssessmentType.personality,
    title: "Personality",
    duration: "30 min",
  },
  { type: AssessmentType.interest, title: "Interest", duration: "25 min" },
];

const MILESTONES = [
  { label: "Create account", done: true },
  { label: "Purchase Career Passport", done: true },
  { label: "Complete aptitude assessment", done: false },
  { label: "Complete personality assessment", done: false },
  { label: "Complete interest assessment", done: false },
  { label: "Review career recommendations", done: false },
];

export function DashboardPage() {
  const auth = useRequirePassport();
  const navigate = useNavigate();
  const aptitude = useAssessmentProgress(AssessmentType.aptitude);
  const personality = useAssessmentProgress(AssessmentType.personality);
  const interest = useAssessmentProgress(AssessmentType.interest);
  const reports = useReports();
  const invoices = useInvoices();
  const generateMutation = useGenerateReport();

  const handleGenerate = async () => {
    try {
      await generateMutation.mutateAsync(AssessmentType.aptitude);
      toast.success("Report generated.");
    } catch {
      toast.error("Couldn't generate report. Please try again.");
    }
  };

  if (!auth.isAuthenticated || !auth.profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Skeleton className="mx-auto h-8 w-48" />
        <Skeleton className="mx-auto mt-4 h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (auth.locked) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Dashboard"
          title={`Welcome back, ${auth.profile.displayName || "student"}`}
          description="Track your assessment progress, view reports, and follow your milestones."
        />
        <div className="relative min-h-[60vh] py-8">
          <LockedOverlay href="/career-passport" />
        </div>
      </div>
    );
  }

  const progressMap = {
    [AssessmentType.aptitude]: aptitude.data,
    [AssessmentType.personality]: personality.data,
    [AssessmentType.interest]: interest.data,
  };

  const completedCount = ASSESSMENT_META.filter(
    (a) => progressMap[a.type]?.submitted,
  ).length;
  const reportList = reports.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${auth.profile.displayName || "student"}`}
        description="Track your assessment progress, view reports, and follow your milestones."
      >
        <Button
          onClick={handleGenerate}
          disabled={generateMutation.isPending}
          data-ocid="dashboard.generate_report_button"
        >
          <RefreshCw className="size-4" aria-hidden />{" "}
          {generateMutation.isPending ? "Generating..." : "Generate Report"}
        </Button>
      </PageHeader>

      {/* Quick stats */}
      <section className="grid gap-4 py-4 sm:grid-cols-3">
        {[
          {
            icon: CheckCircle2,
            label: "Assessments completed",
            value: `${completedCount} / 3`,
            tone: "text-primary",
          },
          {
            icon: FileText,
            label: "Reports ready",
            value: reportList.length,
            tone: "text-orange-600 dark:text-orange-400",
          },
          {
            icon: Award,
            label: "Passport status",
            value: auth.hasPassport ? "Active" : "—",
            tone: "text-chart-3",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </p>
                  <p className={`font-display text-2xl font-bold ${s.tone}`}>
                    {s.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Assessment status */}
      <section className="py-8">
        <SectionHeading
          eyebrow="Assessments"
          title="Your assessment status"
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {ASSESSMENT_META.map((a, i) => {
            const progress = progressMap[a.type];
            const submitted = progress?.submitted ?? false;
            const inProgress = progress && !progress.submitted;
            return (
              <motion.div
                key={a.type}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display text-base">
                        {a.title}
                      </CardTitle>
                      {submitted ? (
                        <StatusBadge tone="success">Completed</StatusBadge>
                      ) : inProgress ? (
                        <StatusBadge tone="warning">In progress</StatusBadge>
                      ) : (
                        <StatusBadge tone="muted">Not started</StatusBadge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-1.5 text-sm">
                      <Clock className="size-3.5" aria-hidden /> {a.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={submitted ? "outline" : "default"}
                      onClick={() =>
                        navigate({
                          to: "/assessments/$type",
                          params: { type: a.type },
                        })
                      }
                      data-ocid={`dashboard.assessment_button.${a.type}`}
                    >
                      {submitted ? "Retake" : inProgress ? "Resume" : "Start"}
                    </Button>
                    {submitted ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() =>
                          navigate({
                            to: "/reports/$type",
                            params: { type: a.type },
                          })
                        }
                        data-ocid={`dashboard.report_button.${a.type}`}
                      >
                        View report
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Reports + milestones */}
      <section className="grid gap-8 py-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Reports"
            title="Your auto-generated reports"
            className="mb-6"
          />
          {reportList.length === 0 ? (
            <Card
              className="border-dashed"
              data-ocid="dashboard.reports_empty_state"
            >
              <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                <BarChart3
                  className="size-8 text-muted-foreground"
                  aria-hidden
                />
                <h3 className="font-display text-base font-semibold text-foreground">
                  No reports yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete an assessment to generate your first report.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {reportList.map((r, i) => (
                <Card key={r.assessmentType}>
                  <CardContent className="flex items-center justify-between pt-6">
                    <div>
                      <p className="font-display text-base font-semibold text-foreground capitalize">
                        {r.assessmentType} report
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Score: {Number(r.totalScore)} / {Number(r.maxScore)} ·{" "}
                        {r.recommendations.length} recommendations
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate({
                          to: "/reports/$type",
                          params: { type: r.assessmentType },
                        })
                      }
                      data-ocid={`dashboard.report_link.${i + 1}`}
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeading
            eyebrow="Milestones"
            title="Your journey"
            className="mb-6"
          />
          <Card>
            <CardContent className="pt-6">
              <ol className="space-y-4">
                {MILESTONES.map((m, i) => (
                  <li
                    key={m.label}
                    className="flex items-center gap-3"
                    data-ocid={`dashboard.milestone.${i + 1}`}
                  >
                    {m.done ? (
                      <CheckCircle2
                        className="size-5 text-primary"
                        aria-hidden
                      />
                    ) : (
                      <span
                        className="flex size-5 items-center justify-center rounded-full border-2 border-border"
                        aria-hidden
                      />
                    )}
                    <span
                      className={
                        m.done
                          ? "text-sm font-medium text-foreground"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {m.label}
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Counsellor card */}
      <section className="py-8">
        <Card className="overflow-hidden border-primary/30">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LifeBuoy className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Need help interpreting your report?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Book a session with one of our certified counsellors.
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              data-ocid="dashboard.contact_counsellor_button"
            >
              <Link to="/contact">Talk to a counsellor</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Purchase history */}
      <section className="py-8">
        <SectionHeading
          eyebrow="Purchase history"
          title="Your invoices"
          className="mb-6"
        />
        {(invoices.data ?? []).length === 0 ? (
          <Card
            className="border-dashed"
            data-ocid="dashboard.invoices_empty_state"
          >
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <Lock className="size-8 text-muted-foreground" aria-hidden />
              <h3 className="font-display text-base font-semibold text-foreground">
                No purchases yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Buy the Career Passport to unlock everything.
              </p>
              <Button
                asChild
                variant="outline"
                data-ocid="dashboard.buy_passport_button"
              >
                <Link to="/career-passport">Get the Career Passport</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {(invoices.data ?? []).map((inv) => (
              <Card key={inv.invoiceNumber}>
                <CardContent className="flex items-center justify-between pt-6">
                  <div>
                    <p className="font-mono text-sm font-semibold text-foreground">
                      {inv.invoiceNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{Number(inv.finalAmount)} · {inv.status}
                    </p>
                  </div>
                  <StatusBadge
                    tone={inv.status === "completed" ? "success" : "warning"}
                  >
                    {inv.status}
                  </StatusBadge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
