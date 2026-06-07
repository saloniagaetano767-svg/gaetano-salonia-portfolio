import type { ContactFormData } from "@/types/portfolio";
import { CONTACT_EMAIL } from "./site";

const CONTACT_DELIVERY_ERROR =
  "Could not send — please email me directly using the address on this page.";

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

function parseFormSubmitResponse(body: string): FormSubmitResponse | null {
  const trimmed = body.trim();
  if (!trimmed) return null;

  return JSON.parse(trimmed) as FormSubmitResponse;
}

function getFormSubmitError(
  response: FormSubmitResponse | null,
): string | null {
  if (!response) return null;

  const success =
    typeof response.success === "string"
      ? response.success.trim().toLowerCase()
      : response.success;

  if (success === false || success === "false") {
    return response.message?.trim() || CONTACT_DELIVERY_ERROR;
  }

  return null;
}

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

  const body = await response.text().catch(() => "");

  if (!response.ok) {
    const payload = tryParseFormSubmitResponse(body);
    throw new Error(
      payload?.message?.trim() || body.trim() || CONTACT_DELIVERY_ERROR,
    );
  }

  let payload: FormSubmitResponse | null;
  try {
    payload = parseFormSubmitResponse(body);
  } catch {
    throw new Error(CONTACT_DELIVERY_ERROR);
  }

  const formSubmitError = getFormSubmitError(payload);
  if (formSubmitError) throw new Error(formSubmitError);
}

function tryParseFormSubmitResponse(body: string): FormSubmitResponse | null {
  try {
    return parseFormSubmitResponse(body);
  } catch {
    return null;
  }
}
