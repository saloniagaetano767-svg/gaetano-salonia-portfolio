import { AvatarPortrait } from "@/components/AvatarPortrait";
import { GlassCard } from "@/components/journey/GlassCard";
import { JourneyStation } from "@/components/journey/JourneyStation";
import { useContact } from "@/hooks/useContact";
import { useTranslation } from "@/i18n";
import { JOURNEY_CTA_PRIMARY, JOURNEY_FOCUS_RING } from "@/lib/layout";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site";
import type { ContactFormData } from "@/types/portfolio";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";

const inputClass = `w-full rounded-xl px-4 py-3.5 text-base text-[var(--ocean-text)] bg-white/6 border border-[var(--ocean-border-subtle)] outline-none focus:border-[var(--ocean-sunset)]/50 focus:bg-white/8 transition-colors duration-200 placeholder:text-[var(--ocean-text-dim)] ${JOURNEY_FOCUS_RING}`;

export function JourneyContact() {
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
    <JourneyStation id="contact">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.85 }}
      >
        <p className="journey-eyebrow">{t.contact.label}</p>
        <h2 className="journey-title !mb-4">
          {t.contact.titleLight}{" "}
          <span className="journey-title-accent">{t.contact.titleAccent}</span>
        </h2>

        <div className="journey-section-divider !mb-6" aria-hidden>
          <Mail className="journey-section-divider-icon w-4 h-4" strokeWidth={1.5} />
        </div>

        <p className="journey-lead">{t.contact.sub}</p>

        <ul className="flex flex-wrap gap-3 mb-8 sm:mb-10">
          <li>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`inline-flex items-center gap-2 text-sm text-[var(--ocean-text-muted)] hover:text-[var(--ocean-text)] border border-[var(--ocean-border-subtle)] rounded-full px-4 py-2.5 min-h-11 transition-colors duration-200 cursor-pointer ${JOURNEY_FOCUS_RING}`}
            >
              <Mail className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              {t.contact.email}
            </a>
          </li>
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.contact.github} (${t.a11y.opensInNewTab})`}
              className={`inline-flex items-center gap-2 text-sm text-[var(--ocean-text-muted)] hover:text-[var(--ocean-text)] border border-[var(--ocean-border-subtle)] rounded-full px-4 py-2.5 min-h-11 transition-colors duration-200 cursor-pointer ${JOURNEY_FOCUS_RING}`}
            >
              <Github className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              {t.contact.github}
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.contact.linkedin} (${t.a11y.opensInNewTab})`}
              className={`inline-flex items-center gap-2 text-sm text-[var(--ocean-text-muted)] hover:text-[var(--ocean-text)] border border-[var(--ocean-border-subtle)] rounded-full px-4 py-2.5 min-h-11 transition-colors duration-200 cursor-pointer ${JOURNEY_FOCUS_RING}`}
            >
              <Linkedin className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              {t.contact.linkedin}
            </a>
          </li>
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_1fr] gap-[var(--section-gap)] lg:gap-12 xl:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto lg:mx-0 w-full max-w-[280px] sm:max-w-xs"
          >
            <AvatarPortrait variant="horizon" />
          </motion.div>

          <GlassCard variant="accent" className="p-5 sm:p-8">
            {isSuccess ? (
              <div
                className="block text-center py-8 sm:py-10"
                role="status"
                aria-live="polite"
              >
                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--ocean-text)] mb-3">
                  {t.contact.successTitle}
                </h3>
                <p className="text-[var(--ocean-text-muted)] text-sm sm:text-base">
                  {t.contact.successMessage}
                </p>
              </div>
            ) : (
              <form
                id={formId}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 sm:gap-5"
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
                    aria-required="true"
                    aria-describedby={
                      errors.name ? `${formId}-name-error` : undefined
                    }
                    className={inputClass}
                  />
                  {errors.name && (
                    <p
                      id={`${formId}-name-error`}
                      className="text-xs text-red-400 mt-1"
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
                    aria-required="true"
                    aria-describedby={
                      errors.email ? `${formId}-email-error` : undefined
                    }
                    className={inputClass}
                  />
                  {errors.email && (
                    <p
                      id={`${formId}-email-error`}
                      className="text-xs text-red-400 mt-1"
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
                    aria-required="true"
                    aria-describedby={
                      errors.message ? `${formId}-message-error` : undefined
                    }
                    className={`${inputClass} resize-none min-h-[120px]`}
                  />
                  {errors.message && (
                    <p
                      id={`${formId}-message-error`}
                      className="text-xs text-red-400 mt-1"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                {isError && (
                  <p
                    className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                    role="alert"
                  >
                    {error?.message ?? t.contact.errorFallback}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isPending || !isFormValid}
                  className={`self-stretch sm:self-start ${JOURNEY_CTA_PRIMARY} disabled:opacity-50 disabled:pointer-events-none ${JOURNEY_FOCUS_RING}`}
                >
                  {isPending ? t.contact.sending : t.contact.send}
                </button>
              </form>
            )}
          </GlassCard>
        </div>

        <p className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-white/8 text-center font-mono text-[10px] text-[var(--ocean-text-dim)] tracking-wider px-4">
          {t.footer.copy} · {t.footer.rights}
        </p>
      </motion.div>
    </JourneyStation>
  );
}
