import type { ContactFormData } from "@/types/portfolio";
import { submitPortfolioContactViaForm } from "./submitPortfolioContact";

type ContactActor = {
  submitContact(name: string, email: string, message: string): Promise<bigint>;
};

export async function submitContactMessage(
  data: ContactFormData,
  actor?: ContactActor | null,
): Promise<bigint | undefined> {
  if (actor) {
    try {
      return await actor.submitContact(data.name, data.email, data.message);
    } catch {
      await submitPortfolioContactViaForm(data);
      return undefined;
    }
  }

  await submitPortfolioContactViaForm(data);
  return undefined;
}
