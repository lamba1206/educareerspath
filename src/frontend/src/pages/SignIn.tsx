import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Fingerprint, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Own your data",
    body: "Internet Identity uses cryptographic passkeys — no passwords, no email to leak.",
  },
  {
    icon: Sparkles,
    title: "Save & resume",
    body: "Your assessment progress is tied to your identity, so you can pause on any device.",
  },
  {
    icon: ArrowRight,
    title: "Auto reports",
    body: "Reports land in your dashboard the moment you finish an assessment.",
  },
];

export function SignInPage() {
  const { isAuthenticated, isInitializing, login, profile } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated && profile) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-7" aria-hidden />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold text-foreground">
            You're signed in
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back{profile.displayName ? `, ${profile.displayName}` : ""}.
            Head to your dashboard to continue.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="signin.go_dashboard_button"
            >
              <Link to="/dashboard">Go to dashboard</Link>
            </CTAButton>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: "/" })}
              data-ocid="signin.go_home_button"
            >
              Back home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Sign in"
        title="Sign in with Internet Identity"
        description="We use Internet Identity — a cryptographic passkey login built for the Internet Computer. No passwords, no email to leak."
        align="center"
      />

      <section className="grid items-center gap-10 py-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {BENEFITS.map((b) => (
            <Card key={b.title}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="size-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-primary/30 shadow-elevated">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Fingerprint className="size-6" aria-hidden />
                <CardTitle className="font-display text-xl">
                  Internet Identity
                </CardTitle>
              </div>
              <CardDescription className="text-primary-foreground/80">
                Passkey-based · no password
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                You'll be redirected to the Internet Identity service to create
                or use your passkey. We never see your biometrics — only a
                cryptographic proof that you own this identity.
              </p>
              <Button
                onClick={login}
                disabled={isInitializing}
                className="mt-6 w-full"
                size="lg"
                data-ocid="signin.identity_button"
              >
                {isInitializing
                  ? "Loading..."
                  : "Continue with Internet Identity"}
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                New here? You'll be guided to create an identity on first
                sign-in.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
