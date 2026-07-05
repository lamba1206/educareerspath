import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TimerProps {
  /**
   * Initial seconds the timer should display when first mounted (or when the
   * parent resets the assessment). The parent computes this from persisted
   * progress so resume picks up where the user left off.
   */
  initialSeconds: number;
  /** Called when the timer hits zero. */
  onExpire?: () => void;
  className?: string;
  /** Visual tone flips to danger under this threshold (seconds). */
  dangerThreshold?: number;
}

function format(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/**
 * Countdown timer for assessment taking. Seeds its internal countdown from
 * `initialSeconds` (so resume restores remaining time from saved progress),
 * ticks locally once per second, and calls `onExpire` when it reaches zero.
 * Calls `onTick` each second so the parent can persist elapsed time.
 */
export function Timer({
  initialSeconds,
  onExpire,
  className,
  dangerThreshold = 60,
}: TimerProps) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }
    const id = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => window.clearTimeout(id);
  }, [remaining, onExpire]);

  const isDanger = remaining <= dangerThreshold;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-sm font-semibold tabular-nums",
        isDanger
          ? "border-destructive/40 bg-destructive/10 text-destructive"
          : "border-border bg-muted text-foreground",
        className,
      )}
      aria-live="polite"
      aria-label={`Time remaining: ${format(remaining)}`}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isDanger ? "bg-destructive" : "bg-primary",
        )}
        aria-hidden
      />
      {format(remaining)}
    </span>
  );
}
