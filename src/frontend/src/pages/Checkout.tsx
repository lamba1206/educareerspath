import { CTAButton } from "@/components/CTAButton";
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
import { useRecordPayment, useValidateCoupon } from "@/hooks/useQueries";
import { CheckCircle2, CreditCard, Lock, ShieldCheck, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PASSPORT_PRICE = 3999n;

export function CheckoutPage() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const couponQuery = useValidateCoupon(appliedCode, PASSPORT_PRICE);
  const recordPayment = useRecordPayment();

  const discount = couponQuery.data?.valid
    ? couponQuery.data.discountAmount
    : 0n;
  const finalAmount = PASSPORT_PRICE - discount;
  const couponError =
    appliedCode && couponQuery.data && !couponQuery.data.valid
      ? (couponQuery.data.reason ?? "Invalid coupon")
      : null;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Enter a coupon code first.");
      return;
    }
    setAppliedCode(couponCode.trim().toUpperCase());
  };

  const handlePay = async () => {
    setPaying(true);
    try {
      await recordPayment.mutateAsync({
        amount: PASSPORT_PRICE,
        currency: "INR",
        couponCode:
          appliedCode && couponQuery.data?.valid ? appliedCode : undefined,
        stripeSessionId: `sess_${Date.now()}`,
      });
      toast.success("Payment successful! Your Career Passport is now active.");
    } catch {
      toast.error("Payment failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Checkout"
        title="Complete your Career Passport purchase"
        description="One-time payment of ₹3,999. Apply a coupon if you have one, then pay securely via Stripe."
        align="center"
      />

      <section className="grid gap-6 py-8 lg:grid-cols-5">
        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">
                Order summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-base font-semibold text-foreground">
                    Career Passport
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lifetime access · all three assessments + Career Library
                  </p>
                </div>
                <p className="font-display text-lg font-semibold text-foreground">
                  ₹{Number(PASSPORT_PRICE)}
                </p>
              </div>

              {/* Coupon */}
              <div className="border-t border-border pt-4">
                <Label htmlFor="coupon" className="mb-1.5 block">
                  Coupon code
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    />
                    <Input
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="WELCOME500"
                      className="pl-9"
                      data-ocid="checkout.coupon_input"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={couponQuery.isFetching}
                    data-ocid="checkout.apply_coupon_button"
                  >
                    Apply
                  </Button>
                </div>
                {couponError ? (
                  <p
                    className="mt-2 text-xs text-destructive"
                    data-ocid="checkout.coupon_error"
                  >
                    {couponError}
                  </p>
                ) : null}
                {couponQuery.data?.valid ? (
                  <p
                    className="mt-2 flex items-center gap-1.5 text-xs text-primary"
                    data-ocid="checkout.coupon_success"
                  >
                    <CheckCircle2 className="size-3.5" aria-hidden /> Coupon
                    applied — you save ₹{Number(discount)}
                  </p>
                ) : null}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{Number(PASSPORT_PRICE)}</span>
                </div>
                {discount > 0n ? (
                  <div className="flex justify-between text-primary">
                    <span>Discount</span>
                    <span>−₹{Number(discount)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span>₹{Number(finalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="border-primary/30 shadow-elevated">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="size-5 text-primary" aria-hidden />
                <CardTitle className="font-display text-base">
                  Payment
                </CardTitle>
              </div>
              <CardDescription className="text-sm">
                Secured by Stripe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="4242 4242 4242 4242"
                  data-ocid="checkout.card_number_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="card-expiry">Expiry</Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM / YY"
                    data-ocid="checkout.card_expiry_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input
                    id="card-cvc"
                    placeholder="123"
                    data-ocid="checkout.card_cvc_input"
                  />
                </div>
              </div>
              <CTAButton
                tone="primary"
                size="lg"
                className="w-full"
                onClick={handlePay}
                disabled={paying}
                data-ocid="checkout.pay_button"
              >
                <Lock className="size-4" aria-hidden />{" "}
                {paying ? "Processing..." : `Pay ₹${Number(finalAmount)}`}
              </CTAButton>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" aria-hidden /> Encrypted ·
                PCI-compliant
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Trust badges */}
      <section className="py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-primary" aria-hidden /> Secure
            payment
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary" aria-hidden />{" "}
            Lifetime access
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StatusBadge tone="muted">No subscriptions</StatusBadge>
          </span>
        </div>
      </section>
    </div>
  );
}
