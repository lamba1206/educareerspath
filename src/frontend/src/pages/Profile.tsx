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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequireAuth } from "@/hooks/useAuth";
import {
  useInvoices,
  useUpsertProfile,
  useUserProfile,
} from "@/hooks/useQueries";
import { CheckCircle2, Mail, ShieldCheck, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ProfilePage() {
  const auth = useRequireAuth();
  const invoices = useInvoices();
  const upsertMut = useUpsertProfile();

  const [form, setForm] = useState({ displayName: "", email: "" });

  // Sync form with profile once loaded (in an effect, never during render).
  useEffect(() => {
    if (auth.profile) {
      setForm({
        displayName: auth.profile.displayName,
        email: auth.profile.email,
      });
    }
  }, [auth.profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.displayName || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    try {
      await upsertMut.mutateAsync({
        displayName: form.displayName,
        email: form.email,
      });
      toast.success("Profile updated.");
    } catch {
      toast.error("Couldn't update profile. Please try again.");
    }
  };

  if (!auth.isAuthenticated || !auth.profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Skeleton className="mx-auto h-8 w-48" />
      </div>
    );
  }

  const invoiceList = invoices.data ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Profile"
        title="Your account"
        description="Update your details and view your purchase history."
      />

      <section className="grid gap-8 py-8 lg:grid-cols-2">
        {/* Profile form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="size-5 text-primary" aria-hidden />
                <CardTitle className="font-display text-base">
                  Account details
                </CardTitle>
              </div>
              <CardDescription className="text-sm">
                Update your display name and email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="profile-name">Display name</Label>
                  <Input
                    id="profile-name"
                    value={form.displayName}
                    onChange={(e) =>
                      setForm({ ...form, displayName: e.target.value })
                    }
                    placeholder="Your name"
                    data-ocid="profile.name_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    data-ocid="profile.email_input"
                  />
                  <div className="flex items-center gap-1.5 text-xs">
                    {auth.profile.emailVerified ? (
                      <span
                        className="inline-flex items-center gap-1 text-primary"
                        data-ocid="profile.email_verified"
                      >
                        <CheckCircle2 className="size-3.5" aria-hidden />{" "}
                        Verified
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 text-muted-foreground"
                        data-ocid="profile.email_unverified"
                      >
                        <Mail className="size-3.5" aria-hidden /> Not verified
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={upsertMut.isPending}
                  data-ocid="profile.save_button"
                >
                  {upsertMut.isPending ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" aria-hidden />
                <CardTitle className="font-display text-base">
                  Account status
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Role</span>
                <StatusBadge
                  tone={auth.profile.role === "admin" ? "default" : "muted"}
                >
                  {auth.profile.role}
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Career Passport</span>
                <StatusBadge tone={auth.hasPassport ? "success" : "muted"}>
                  {auth.hasPassport ? "Active" : "Not purchased"}
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email verified</span>
                <StatusBadge
                  tone={auth.profile.emailVerified ? "success" : "warning"}
                >
                  {auth.profile.emailVerified ? "Yes" : "Pending"}
                </StatusBadge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Purchase history */}
      <section className="py-8">
        <SectionHeading
          eyebrow="Purchase history"
          title="Your invoices"
          className="mb-6"
        />
        {invoiceList.length === 0 ? (
          <Card
            className="border-dashed"
            data-ocid="profile.invoices_empty_state"
          >
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <h3 className="font-display text-base font-semibold text-foreground">
                No purchases yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Buy the Career Passport to unlock everything.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {invoiceList.map((inv, i) => (
              <Card key={inv.invoiceNumber}>
                <CardContent className="flex items-center justify-between pt-6">
                  <div>
                    <p className="font-mono text-sm font-semibold text-foreground">
                      {inv.invoiceNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{Number(inv.finalAmount)} ·{" "}
                      {new Date(Number(inv.issuedAt)).toLocaleDateString(
                        "en-IN",
                      )}
                    </p>
                  </div>
                  <StatusBadge
                    tone={inv.status === "completed" ? "success" : "warning"}
                    data-ocid={`profile.invoice_status.${i + 1}`}
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
