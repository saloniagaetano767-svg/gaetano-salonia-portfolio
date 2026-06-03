import { useTranslation } from "@/i18n";
import { motion } from "motion/react";
import { useState } from "react";
import { useContact } from "../../hooks/useContact";
import type { ContactFormData } from "../../types/portfolio";

export function ContactSection() {
  const { t } = useTranslation();
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
    name: touched.name && !form.name.trim() ? t.contact.nameError : null,
    email:
      touched.email && !form.email.trim()
        ? t.contact.emailError
        : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
          ? t.contact.emailInvalid
          : null,
    message:
      touched.message && !form.message.trim() ? t.contact.messageError : null,
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
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
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
      className="max-w-[1100px] mx-auto px-8 py-[90px]"
      data-ocid="contact.section"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-[11px] text-primary tracking-[0.14em] uppercase mb-3.5">
          05 / {t.contact.label}
        </p>
        <h2 className="font-display font-extrabold text-[clamp(34px,5vw,52px)] tracking-tight leading-tight mb-4">
          <span className="grad-light">{t.contact.titleLight}</span>
          <br />
          <span className="grad-teal">{t.contact.titleAccent}</span>
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-11 max-w-lg">
          {t.contact.sub}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-lg"
      >
          {isSuccess ? (
            <div
              className="glass-card rounded-[18px] p-10 text-center"
              data-ocid="contact.success_state"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {t.contact.successTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.contact.successMessage}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3"
              data-ocid="contact.form"
            >
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder={t.contact.namePlaceholder}
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="surface-muted rounded-[11px] px-4 py-3.5 text-foreground text-sm outline-none focus:border-primary/40 transition-colors"
                data-ocid="contact.name_input"
              />
              {errors.name && (
                <p className="text-xs text-destructive -mt-1">{errors.name}</p>
              )}
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t.contact.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="surface-muted rounded-[11px] px-4 py-3.5 text-foreground text-sm outline-none focus:border-primary/40 transition-colors"
                data-ocid="contact.email_input"
              />
              {errors.email && (
                <p className="text-xs text-destructive -mt-1">{errors.email}</p>
              )}
              <textarea
                name="message"
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className="surface-muted rounded-[11px] px-4 py-3.5 text-foreground text-sm outline-none focus:border-primary/40 transition-colors resize-none"
                data-ocid="contact.message_textarea"
              />
              {errors.message && (
                <p className="text-xs text-destructive -mt-1">
                  {errors.message}
                </p>
              )}
              {isError && (
                <p
                  className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                  data-ocid="contact.error_state"
                >
                  {error?.message ?? t.contact.errorFallback}
                </p>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="btn-gradient self-start font-bold text-sm px-6 py-3 rounded-[11px] hover:-translate-y-0.5 cta-glow transition-all disabled:opacity-60"
                data-ocid="contact.submit_button"
              >
                {isPending ? t.contact.sending : t.contact.send}
              </button>
            </form>
          )}
      </motion.div>
    </section>
  );
}
