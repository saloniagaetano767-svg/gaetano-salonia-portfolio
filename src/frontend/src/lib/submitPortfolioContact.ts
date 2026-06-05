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

  const bodyText = await response.text().catch(() => "");
  const responseBody = parseFormSubmitResponse(bodyText);
  const deliveryFailed =
    responseBody?.success === false || responseBody?.success === "false";

  if (!response.ok || deliveryFailed) {
    throw new Error(
      responseBody?.message ||
        bodyText.trim() ||
        "Could not send — please email me directly using the address on this page.",
    );
  }
}

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

function parseFormSubmitResponse(bodyText: string): FormSubmitResponse | null {
  if (!bodyText.trim()) return null;

  try {
    const parsed = JSON.parse(bodyText) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as FormSubmitResponse;
  } catch {
    return null;
  }
}
