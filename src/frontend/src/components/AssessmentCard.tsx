import type {
  AssessmentDefinition,
  AssessmentProgress,
  AssessmentType,
} from "@/backend";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Compass, Users } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

interface AssessmentCardProps {
  definition: AssessmentDefinition;
  progress?: AssessmentProgress | null;
  onStart: (type: AssessmentType) => void;
  onViewReport?: (type: AssessmentType) => void;
  index?: number;
  className?: string;
}

const accentMap = {
  aptitude: {
    ring: "ring-primary/20",
    bg: "bg-primary/10",
    text: "text-primary",
  },
  personality: {
    ring: "ring-orange-500/20",
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
  },
  interest: {
    ring: "ring-chart-3/20",
    bg: "bg-chart-3/10",
    text: "text-chart-3",
  },
} as const;

const iconMap = {
  aptitude: Brain,
  personality: Users,
  interest: Compass,
} as const;

/**
 * Card describing a single assessment (aptitude / personality / interest).
 * Shows duration, question count, in-progress state, and a primary CTA that
 * either starts or resumes the assessment.
 */
export function AssessmentCard({
  definition,
  progress,
  onStart,
  onViewReport,
  index = 0,
  className,
}: AssessmentCardProps) {
  const accent = accentMap[definition.assessmentType];
  const Icon = iconMap[definition.assessmentType];
  const inProgress = progress && !progress.submitted;
  const completed = progress?.submitted ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card
        className={`group relative overflow-hidden transition-smooth hover:shadow-elevated ${className ?? ""}`}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div
              className={`flex size-11 items-center justify-center rounded-lg ${accent.bg} ${accent.text}`}
            >
              <Icon className="size-5" aria-hidden />
            </div>
            {completed ? (
              <StatusBadge tone="success">Completed</StatusBadge>
            ) : inProgress ? (
              <StatusBadge tone="warning">In progress</StatusBadge>
            ) : (
              <StatusBadge tone="muted">
                {Number(definition.durationMinutes)} min
              </StatusBadge>
            )}
          </div>
          <CardTitle className="mt-2 font-display text-lg">
            {definition.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {definition.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Questions
              </dt>
              <dd className="font-semibold text-foreground">
                {Number(definition.totalQuestions)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Duration
              </dt>
              <dd className="font-semibold text-foreground">
                {Number(definition.durationMinutes)} min
              </dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="gap-2">
          <Button
            onClick={() => onStart(definition.assessmentType)}
            data-ocid={`assessment.start_button.${definition.assessmentType}`}
            className="flex-1"
          >
            {completed ? "Retake" : inProgress ? "Resume" : "Start assessment"}
          </Button>
          {completed && onViewReport ? (
            <Button
              variant="outline"
              onClick={() => onViewReport(definition.assessmentType)}
              data-ocid={`assessment.report_button.${definition.assessmentType}`}
            >
              View report
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
