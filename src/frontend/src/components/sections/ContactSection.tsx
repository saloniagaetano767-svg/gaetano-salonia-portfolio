import { useTranslation } from "@/i18n";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
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

  const contactItems = [
    {
      icon: "✉",
      label: "Email",
      value: t.contact.email,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: "⌘",
      label: "GitHub",
      value: t.contact.github,
      href: GITHUB_URL,
    },
    {
      icon: "◈",
      label: "LinkedIn",
      value: t.contact.linkedin,
      href: LINKEDIN_URL,
    },
  ];

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
        <p className="text-sm text-[#5a6a88] leading-relaxed mb-11 max-w-lg">
          {t.contact.sub}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3"
        >
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Email" ? undefined : "_blank"}
              rel={item.label === "Email" ? undefined : "noopener noreferrer"}
              className="flex items-center gap-4 p-4 glass-card rounded-[13px] hover:border-primary/30 hover:bg-primary/[0.04] transition-all"
              data-ocid={`contact.${item.label.toLowerCase()}_link`}
            >
              <span className="text-xl text-primary min-w-6">{item.icon}</span>
              <div>
                <p className="font-mono text-[10px] text-[#3a4a68] tracking-wider uppercase mb-0.5">
                  {item.label}
                </p>
                <p className="text-[13px] text-[#c8d0e0] font-medium">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {isSuccess ? (
            <div
              className="glass-card rounded-[18px] p-10 text-center"
              data-ocid="contact.success_state"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {t.contact.successTitle}
              </h3>
              <p className="text-sm text-[#8a9ab8]">
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
                className="bg-white/[0.04] border border-white/[0.09] rounded-[11px] px-4 py-3.5 text-foreground text-sm outline-none focus:border-primary/40 transition-colors"
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
                className="bg-white/[0.04] border border-white/[0.09] rounded-[11px] px-4 py-3.5 text-foreground text-sm outline-none focus:border-primary/40 transition-colors"
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
                className="bg-white/[0.04] border border-white/[0.09] rounded-[11px] px-4 py-3.5 text-foreground text-sm outline-none focus:border-primary/40 transition-colors resize-none"
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
                className="btn-gradient self-start font-bold text-sm px-6 py-3 rounded-[11px] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(94,231,208,0.25)] transition-all disabled:opacity-60"
                data-ocid="contact.submit_button"
              >
                {isPending ? t.contact.sending : t.contact.send}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
