import { AssessmentType } from "@/backend";
import { PageHeader } from "@/components/PageHeader";
import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequireAuth } from "@/hooks/useAuth";
import {
  useAssessmentProgress,
  useSaveProgress,
  useSubmitAssessment,
} from "@/hooks/useQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const DURATION_SECONDS: Record<AssessmentType, number> = {
  [AssessmentType.aptitude]: 45 * 60,
  [AssessmentType.personality]: 30 * 60,
  [AssessmentType.interest]: 25 * 60,
};

const SAMPLE_QUESTIONS = [
  {
    id: 1n,
    prompt:
      "If 5 machines make 5 widgets in 5 minutes, how long would 100 machines take to make 100 widgets?",
    options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
  },
  {
    id: 2n,
    prompt: "I enjoy organising people and resources to hit a deadline.",
    options: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
  },
  {
    id: 3n,
    prompt: "Which of these activities sounds most appealing to you?",
    options: [
      "Building a model from scratch",
      "Helping someone solve a problem",
      "Designing a poster",
      "Analysing data in a spreadsheet",
    ],
  },
];

export function AssessmentTakingPage() {
  const { type } = useParams({ from: "/assessments/$type" });
  const assessmentType = type as AssessmentType;
  const auth = useRequireAuth();
  const navigate = useNavigate();
  const { data: progress, isLoading } = useAssessmentProgress(assessmentType);
  const saveMutation = useSaveProgress();
  const submitMutation = useSubmitAssessment();

  const totalSeconds = DURATION_SECONDS[assessmentType] ?? 45 * 60;
  const questions = SAMPLE_QUESTIONS;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, bigint>>({});
  // Elapsed seconds persisted across save/resume so the timer resumes correctly.
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (progress?.answers) {
      const restored: Record<string, bigint> = {};
      for (const a of progress.answers) {
        restored[Number(a.questionId).toString()] = a.selectedOption;
      }
      setAnswers(restored);
    }
    // Restore elapsed time from progress so the timer picks up where we left off.
    if (progress?.startedAt && progress?.lastSavedAt) {
      const elapsed = Number(progress.lastSavedAt - progress.startedAt);
      if (elapsed > 0) {
        setElapsedSeconds(Math.min(elapsed, totalSeconds));
      }
    }
  }, [progress, totalSeconds]);

  const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const allAnswered = answeredCount === questions.length;
  const isSubmitted = progress?.submitted ?? false;

  const handleSelect = (questionId: bigint, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [Number(questionId).toString()]: BigInt(optionIdx),
    }));
  };

  const handleSave = async () => {
    const payload = Object.entries(answers).map(([qid, opt]) => ({
      questionId: BigInt(qid),
      selectedOption: opt,
    }));
    try {
      await saveMutation.mutateAsync({ assessmentType, answers: payload });
      toast.success("Progress saved. You can resume anytime.");
    } catch {
      toast.error("Couldn't save progress. Please try again.");
    }
  };

  const submitWithCurrentAnswers = async (force = false) => {
    if (!force && !allAnswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }
    const payload = Object.entries(answers).map(([qid, opt]) => ({
      questionId: BigInt(qid),
      selectedOption: opt,
    }));
    try {
      await saveMutation.mutateAsync({ assessmentType, answers: payload });
      await submitMutation.mutateAsync(assessmentType);
      toast.success("Assessment submitted! Generating your report...");
      navigate({ to: "/reports/$type", params: { type: assessmentType } });
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleSubmit = () => submitWithCurrentAnswers(false);

  // On timer expiry, submit regardless of whether all questions are answered.
  const handleTimeUp = () => {
    toast.error("Time's up! Submitting your assessment.");
    void submitWithCurrentAnswers(true);
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
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="mt-6 h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" aria-hidden />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold text-foreground">
            Already submitted
          </h1>
          <p className="mt-2 text-muted-foreground">
            You've completed this assessment. View your report or retake it.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              onClick={() =>
                navigate({
                  to: "/reports/$type",
                  params: { type: assessmentType },
                })
              }
              data-ocid="assessment_taking.view_report_button"
            >
              View report
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/assessments" })}
              data-ocid="assessment_taking.back_button"
            >
              Back to assessments
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const current = questions[currentIdx];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow={`${assessmentType} assessment`}
        title={`${assessmentType.charAt(0).toUpperCase()}${assessmentType.slice(1)} assessment`}
        description="Answer honestly — there are no right or wrong answers for personality and interest questions."
      />

      <div className="flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span data-ocid="assessment_taking.progress_label">
            Question {currentIdx + 1} of {questions.length}
          </span>
          <span aria-hidden>·</span>
          <span>{answeredCount} answered</span>
        </div>
        <Timer
          initialSeconds={remainingSeconds}
          onExpire={handleTimeUp}
          data-ocid="assessment_taking.timer"
        />
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <motion.div
        key={currentIdx}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              {current.prompt}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[Number(current.id).toString()]?.toString() ?? ""}
              onValueChange={(val) => handleSelect(current.id, Number(val))}
              className="space-y-3"
            >
              {current.options.map((opt, i) => {
                const optionId = `q${current.id}-opt${i}`;
                return (
                  <div
                    key={opt}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 transition-smooth hover:bg-muted/50"
                  >
                    <RadioGroupItem
                      value={i.toString()}
                      id={optionId}
                      data-ocid={`assessment_taking.option.${i + 1}`}
                    />
                    <Label
                      htmlFor={optionId}
                      className="flex-1 cursor-pointer text-sm font-normal text-foreground"
                    >
                      {opt}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          data-ocid="assessment_taking.prev_button"
        >
          Previous
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            data-ocid="assessment_taking.save_button"
          >
            {saveMutation.isPending ? "Saving..." : "Save progress"}
          </Button>
          {currentIdx < questions.length - 1 ? (
            <Button
              onClick={() =>
                setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))
              }
              data-ocid="assessment_taking.next_button"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitMutation.isPending}
              data-ocid="assessment_taking.submit_button"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit assessment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
