import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useContact } from "../../hooks/useContact";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import type { ContactFormData } from "../../types/portfolio";

const EMAIL = "hello@gaetanosalonia.com";
const CV_URL = "/cv.pdf";

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.08,
  });
  const { mutate, isPending, isSuccess, isError, error } = useContact();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<
    Record<keyof ContactFormData, boolean>
  >({
    name: false,
    email: false,
    message: false,
  });

  const errors = {
    name: touched.name && !form.name.trim() ? "Name is required" : null,
    email:
      touched.email && !form.email.trim()
        ? "Email is required"
        : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
          ? "Enter a valid email address"
          : null,
    message:
      touched.message && !form.message.trim() ? "Message is required" : null,
  };

  const isFormValid =
    form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.message.trim();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isFormValid) return;
    mutate(form);
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`scroll-fade ${isVisible ? "visible" : ""} py-24 px-6`}
      data-ocid="contact.section"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2 opacity-80">
              Contact
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Let&apos;s <span className="text-gradient">talk</span>
            </h2>
          </div>
          <a
            href={CV_URL}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-primary font-display font-medium text-sm hover:bg-primary/10 hover:border-primary/70 transition-smooth group shrink-0"
            data-ocid="contact.download_cv_button"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            Download CV
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form Column */}
          <div className="lg:col-span-3">
            {isSuccess ? (
              <div
                className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl border border-primary/20 bg-card/50 text-center"
                data-ocid="contact.success_state"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-5">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Message sent!
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thanks! I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
                data-ocid="contact.form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-xs font-display tracking-wider uppercase text-muted-foreground"
                    >
                      Name
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-card/60 border-border focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 h-11"
                      data-ocid="contact.name_input"
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="text-xs text-destructive mt-1"
                        data-ocid="contact.name.field_error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-xs font-display tracking-wider uppercase text-muted-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-card/60 border-border focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 h-11"
                      data-ocid="contact.email_input"
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="text-xs text-destructive mt-1"
                        data-ocid="contact.email.field_error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="text-xs font-display tracking-wider uppercase text-muted-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project or opportunity…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className="bg-card/60 border-border focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 resize-none"
                    data-ocid="contact.message_textarea"
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="text-xs text-destructive mt-1"
                      data-ocid="contact.message.field_error"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {isError && (
                  <p
                    className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                    data-ocid="contact.error_state"
                  >
                    {error?.message ??
                      "Something went wrong. Please try again."}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 font-display font-semibold tracking-wide text-sm bg-primary text-primary-foreground hover:bg-primary/90 glow-primary transition-smooth"
                  data-ocid="contact.submit_button"
                >
                  {isPending ? (
                    <span
                      className="flex items-center gap-2"
                      data-ocid="contact.loading_state"
                    >
                      <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Email contact */}
            <div>
              <p className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-3">
                Or reach out directly
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-200"
                data-ocid="contact.email_link"
              >
                <span className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-smooth">
                  <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </span>
                <span className="font-body text-sm">{EMAIL}</span>
              </a>
            </div>

            {/* Availability badge */}
            <div className="mt-auto pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-display text-primary/80 tracking-wide">
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-center text-muted-foreground text-xs font-body">
          <span>
            © {new Date().getFullYear()} Gaetano Salonia · Switzerland
          </span>
        </div>
      </div>
    </section>
  );
}
