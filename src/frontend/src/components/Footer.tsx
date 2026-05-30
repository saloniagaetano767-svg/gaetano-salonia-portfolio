import { LanguageSwitcher, useTranslation } from "@/i18n";
import { BRAND_MARK } from "@/lib/site";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="border-t border-white/5 py-8 px-8"
      data-ocid="footer.section"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="font-display font-extrabold text-lg">
          <span className="grad-teal">{BRAND_MARK.replace(".", "")}</span>
        </div>
        <div className="text-center">
          <p className="text-[13px] text-[#3a4a68]">{t.footer.copy}</p>
          <p className="font-mono text-[10px] text-[#2a3a58] mt-1">
            {t.footer.rights}
          </p>
        </div>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
