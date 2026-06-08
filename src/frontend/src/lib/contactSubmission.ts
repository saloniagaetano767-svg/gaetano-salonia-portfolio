import type { ContactFormData } from "../types/portfolio";
import { submitPortfolioContactViaForm } from "./submitPortfolioContact";

type ContactActor = {
  submitContact: (
    name: string,
    email: string,
    message: string,
  ) => Promise<bigint>;
};

type ContactFallback = (data: ContactFormData) => Promise<void>;

export async function submitContact(
  data: ContactFormData,
  actor: ContactActor | null | undefined,
  fallback: ContactFallback = submitPortfolioContactViaForm,
): Promise<bigint | undefined> {
  if (actor) {
    try {
      return await actor.submitContact(data.name, data.email, data.message);
    } catch {
      // Preserve contact submissions even when a configured canister traps.
    }
  }

  await fallback(data);
  return undefined;
}
