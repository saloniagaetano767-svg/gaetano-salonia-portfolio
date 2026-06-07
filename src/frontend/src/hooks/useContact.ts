import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { createActor } from "../backend";
import { submitPortfolioContactViaForm } from "../lib/submitPortfolioContact";
import type { ContactFormData } from "../types/portfolio";

type ContactActor = Pick<ReturnType<typeof createActor>, "submitContact">;

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

export function useContact() {
  const { actor } = useActor(createActor);

  return useMutation<bigint | undefined, Error, ContactFormData>({
    mutationFn: (data) => submitContactMessage(data, actor),
  });
}
