import type { ContactFormData } from "@/types/portfolio";
import { CONTACT_EMAIL } from "./site";

/** Static-hosting fallback when the Internet-Computer backend actor is unavailable. */
export async function submitPortfolioContactViaForm(
  data: ContactFormData,
): Promise<void> {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _subject: `Portfolio contact: ${data.name}`,
      _replyto: data.email,
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      text.trim() ||
        "Could not send — please email me directly using the address on this page.",
    );
  }
}
