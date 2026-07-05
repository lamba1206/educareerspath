import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 93102 62206",
    href: "tel:+919310262206",
  },
  {
    icon: Mail,
    label: "Email",
    value: "admin@educareerspath.com",
    href: "mailto:admin@educareerspath.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Connaught Place, New Delhi, 110001",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat · 10:00 AM – 7:00 PM IST",
    href: undefined,
  },
];

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! We'll get back to you within 1 business day.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Contact us"
        title="Talk to a real person about the ecosystem"
        description="Whether it's about assessments, careers, colleges, exams, scholarships, or partnerships — our team replies within 1 business day."
      />

      <section className="grid gap-8 py-8 lg:grid-cols-2">
        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {CONTACT_DETAILS.map((d) => (
            <Card key={d.label}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <d.icon className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="font-medium text-foreground transition-smooth hover:text-primary"
                      data-ocid={`contact.${d.label.toLowerCase()}_link`}
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="font-medium text-foreground">{d.value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-primary/30 bg-gradient-primary text-primary-foreground">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary-foreground/15 text-primary-foreground">
                <MessageCircle className="size-5" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                  WhatsApp
                </p>
                <p className="font-medium">
                  Chat with us on WhatsApp for quick questions.
                </p>
              </div>
              <CTAButton
                asChild
                tone="primary"
                size="sm"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                data-ocid="contact.whatsapp_button"
              >
                <a
                  href="https://wa.me/919310262206"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open WhatsApp
                </a>
              </CTAButton>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Your name"
                      data-ocid="contact.name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      data-ocid="contact.email_input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    placeholder="What's this about?"
                    data-ocid="contact.subject_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us a bit more..."
                    rows={5}
                    data-ocid="contact.message_input"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                  data-ocid="contact.submit_button"
                >
                  {submitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
