import { AssessmentType, CouponType } from "@/backend";
import { PageHeader } from "@/components/PageHeader";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequireAdmin } from "@/hooks/useAuth";
import {
  useAdminSuspendUser,
  useAdminUnsuspendUser,
  useAdminUsers,
  useAllInvoices,
  useCoupons,
  useCreateCoupon,
  useDeleteCoupon,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Ban, CheckCircle2, FileText, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminPage() {
  const auth = useRequireAdmin();
  const [tab, setTab] = useState("users");

  if (!auth.isAuthenticated || auth.role !== "admin") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Skeleton className="mx-auto h-8 w-48" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Admin"
        title="Admin panel"
        description="Manage users, review reports, create coupons, and track payments."
      />

      <Tabs value={tab} onValueChange={setTab} className="py-6">
        <TabsList
          className="grid w-full grid-cols-2 sm:grid-cols-4"
          data-ocid="admin.tabs"
        >
          <TabsTrigger value="users" data-ocid="admin.tab.users">
            <Users className="size-4" aria-hidden /> Users
          </TabsTrigger>
          <TabsTrigger value="reports" data-ocid="admin.tab.reports">
            <FileText className="size-4" aria-hidden /> Reports
          </TabsTrigger>
          <TabsTrigger value="coupons" data-ocid="admin.tab.coupons">
            Coupons
          </TabsTrigger>
          <TabsTrigger value="payments" data-ocid="admin.tab.payments">
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="pt-6">
          <UsersTab />
        </TabsContent>
        <TabsContent value="reports" className="pt-6">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="coupons" className="pt-6">
          <CouponsTab />
        </TabsContent>
        <TabsContent value="payments" className="pt-6">
          <PaymentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UsersTab() {
  const { data, isLoading } = useAdminUsers({ offset: 0n, limit: 50n });
  const suspendMut = useAdminSuspendUser();
  const unsuspendMut = useAdminUnsuspendUser();
  const users = data ?? [];

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  if (users.length === 0) {
    return (
      <Card className="border-dashed" data-ocid="admin.users_empty_state">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <Users className="size-8 text-muted-foreground" aria-hidden />
          <h3 className="font-display text-base font-semibold text-foreground">
            No users yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Users will appear here once they sign in.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Passport</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u, i) => (
              <TableRow
                key={u.profile.id.toString()}
                data-ocid={`admin.user_row.${i + 1}`}
              >
                <TableCell className="font-medium">
                  {u.profile.displayName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {u.profile.email}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    tone={u.profile.role === "admin" ? "default" : "muted"}
                  >
                    {u.profile.role}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  {u.profile.passportPurchased ? (
                    <StatusBadge tone="success">Active</StatusBadge>
                  ) : (
                    <StatusBadge tone="muted">—</StatusBadge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {u.profile.suspended ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => unsuspendMut.mutate(u.profile.id)}
                      data-ocid={`admin.unsuspend_button.${i + 1}`}
                    >
                      <CheckCircle2 className="size-4" aria-hidden /> Unsuspend
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => suspendMut.mutate(u.profile.id)}
                      data-ocid={`admin.suspend_button.${i + 1}`}
                      className="text-destructive hover:text-destructive"
                    >
                      <Ban className="size-4" aria-hidden /> Suspend
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ReportsTab() {
  const { data, isLoading } = useAdminUsers({ offset: 0n, limit: 50n });
  const users = (data ?? []).filter((u) => u.profile.role !== "admin");

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  if (users.length === 0) {
    return (
      <Card className="border-dashed" data-ocid="admin.reports_empty_state">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <FileText className="size-8 text-muted-foreground" aria-hidden />
          <h3 className="font-display text-base font-semibold text-foreground">
            No student reports yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Student reports will appear here once assessments are submitted.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 py-4">
          <FileText className="size-5 mt-0.5 text-primary" aria-hidden />
          <p className="text-sm text-muted-foreground">
            Reports are generated per student and assessment. Select a student
            below to view their individual reports from the{" "}
            <Link
              to="/admin"
              className="font-medium text-primary hover:underline"
            >
              Users tab
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {users.map((u, i) => (
          <Card
            key={u.profile.id.toString()}
            data-ocid={`admin.report_row.${i + 1}`}
          >
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-display text-base font-semibold text-foreground">
                  {u.profile.displayName || "Unnamed student"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {u.profile.email} ·{" "}
                  {u.profile.passportPurchased
                    ? "Passport active"
                    : "No passport"}
                </p>
              </div>
              <StatusBadge
                tone={u.profile.passportPurchased ? "success" : "muted"}
              >
                {u.profile.passportPurchased ? "Eligible" : "Locked"}
              </StatusBadge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CouponsTab() {
  const { data, isLoading } = useCoupons();
  const createMut = useCreateCoupon();
  const deleteMut = useDeleteCoupon();
  const [form, setForm] = useState({
    code: "",
    value: "500",
    type: CouponType.flat,
    description: "",
  });

  const coupons = data ?? [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code) {
      toast.error("Please enter a coupon code.");
      return;
    }
    try {
      await createMut.mutateAsync({
        code: form.code.toUpperCase(),
        value: BigInt(form.value),
        couponType: form.type,
        active: true,
        description: form.description || undefined,
      });
      toast.success(`Coupon ${form.code.toUpperCase()} created.`);
      setForm({
        code: "",
        value: "500",
        type: CouponType.flat,
        description: "",
      });
    } catch {
      toast.error("Couldn't create coupon.");
    }
  };

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">
            Create coupon
          </CardTitle>
          <CardDescription>
            Flat or percentage discount on the Career Passport.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="coupon-code">Code</Label>
              <Input
                id="coupon-code"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="WELCOME500"
                data-ocid="admin.coupon_code_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-value">
                Value (₹ for flat, % for percent)
              </Label>
              <Input
                id="coupon-value"
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                data-ocid="admin.coupon_value_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-type">Type</Label>
              <select
                id="coupon-type"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as CouponType })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                data-ocid="admin.coupon_type_select"
              >
                <option value={CouponType.flat}>Flat (₹)</option>
                <option value={CouponType.percent}>Percent (%)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-desc">Description (optional)</Label>
              <Input
                id="coupon-desc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Welcome discount"
                data-ocid="admin.coupon_desc_input"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={createMut.isPending}
                data-ocid="admin.create_coupon_button"
              >
                <Plus className="size-4" aria-hidden />{" "}
                {createMut.isPending ? "Creating..." : "Create coupon"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {coupons.length === 0 ? (
        <Card className="border-dashed" data-ocid="admin.coupons_empty_state">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <h3 className="font-display text-base font-semibold text-foreground">
              No coupons yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Create your first coupon above.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Redemptions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((c, i) => (
                  <TableRow
                    key={c.code}
                    data-ocid={`admin.coupon_row.${i + 1}`}
                  >
                    <TableCell className="font-mono font-semibold">
                      {c.code}
                    </TableCell>
                    <TableCell className="capitalize">{c.couponType}</TableCell>
                    <TableCell>
                      {c.couponType === CouponType.flat
                        ? `₹${Number(c.value)}`
                        : `${Number(c.value)}%`}
                    </TableCell>
                    <TableCell>{Number(c.redemptions)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteMut.mutate(c.code)}
                        className="text-destructive hover:text-destructive"
                        data-ocid={`admin.delete_coupon_button.${i + 1}`}
                      >
                        <Trash2 className="size-4" aria-hidden /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PaymentsTab() {
  const { data, isLoading } = useAllInvoices();
  const invoices = data ?? [];

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  if (invoices.length === 0) {
    return (
      <Card className="border-dashed" data-ocid="admin.payments_empty_state">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <h3 className="font-display text-base font-semibold text-foreground">
            No payments yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Payments will appear here once students purchase the Career
            Passport.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv, i) => (
              <TableRow
                key={inv.invoiceNumber}
                data-ocid={`admin.payment_row.${i + 1}`}
              >
                <TableCell className="font-mono text-sm">
                  {inv.invoiceNumber}
                </TableCell>
                <TableCell>₹{Number(inv.finalAmount)}</TableCell>
                <TableCell>₹{Number(inv.discountAmount)}</TableCell>
                <TableCell>
                  <StatusBadge
                    tone={
                      inv.status === "completed"
                        ? "success"
                        : inv.status === "pending"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {inv.status}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
