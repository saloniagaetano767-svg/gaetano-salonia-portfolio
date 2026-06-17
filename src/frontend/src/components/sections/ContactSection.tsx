import { SectionHeader } from "@/components/sections/SectionHeader";
import { useContact } from "@/hooks/useContact";
import { useTranslation } from "@/i18n";
import { FOCUS_RING, SECTION_CONTAINER } from "@/lib/layout";
import type { ContactFormData } from "@/types/portfolio";
import { motion } from "motion/react";
import { useId, useState } from "react";

const inputClass = `surface-muted rounded-[11px] px-4 py-3.5 text-foreground text-base outline-none focus:border-primary/40 transition-colors w-full ${FOCUS_RING}`;

export function ContactSection() {
  const { t } = useTranslation();
  const formId = useId();
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
      className={SECTION_CONTAINER}
      data-ocid="contact.section"
    >
      <SectionHeader
        index={t.sections.contact}
        label={t.contact.label}
        titleLight={t.contact.titleLight}
        titleAccent={t.contact.titleAccent}
        subtitle={
          <p className="text-base text-muted-foreground leading-relaxed mt-4 max-w-lg">
            {t.contact.sub}
          </p>
        }
        className="mb-11"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-lg"
      >
        {isSuccess ? (
          <output
            className="glass-card rounded-[18px] p-10 text-center block"
            data-ocid="contact.success_state"
          >
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              {t.contact.successTitle}
            </h3>
            <p className="text-base text-muted-foreground">
              {t.contact.successMessage}
            </p>
          </output>
        ) : (
          <form
            id={formId}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
            data-ocid="contact.form"
          >
            <div>
              <label htmlFor={`${formId}-name`} className="sr-only">
                {t.contact.namePlaceholder}
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                name="name"
                autoComplete="name"
                placeholder={t.contact.namePlaceholder}
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={
                  errors.name ? `${formId}-name-error` : undefined
                }
                className={inputClass}
                data-ocid="contact.name_input"
              />
              {errors.name && (
                <p
                  id={`${formId}-name-error`}
                  className="text-xs text-destructive mt-1"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-email`} className="sr-only">
                {t.contact.emailPlaceholder}
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t.contact.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? `${formId}-email-error` : undefined
                }
                className={inputClass}
                data-ocid="contact.email_input"
              />
              {errors.email && (
                <p
                  id={`${formId}-email-error`}
                  className="text-xs text-destructive mt-1"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-message`} className="sr-only">
                {t.contact.messagePlaceholder}
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message ? `${formId}-message-error` : undefined
                }
                className={`${inputClass} resize-none`}
                data-ocid="contact.message_textarea"
              />
              {errors.message && (
                <p
                  id={`${formId}-message-error`}
                  className="text-xs text-destructive mt-1"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {isError && (
              <p
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                role="alert"
                data-ocid="contact.error_state"
              >
                {error?.message ?? t.contact.errorFallback}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={`btn-gradient self-start font-bold text-sm px-6 py-3 min-h-11 rounded-[11px] hover:-translate-y-0.5 cta-glow transition-all disabled:opacity-60 cursor-pointer ${FOCUS_RING}`}
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
