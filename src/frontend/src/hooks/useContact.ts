import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { createActor } from "../backend";
import { submitPortfolioContact } from "../lib/submitPortfolioContact";
import type { ContactFormData } from "../types/portfolio";

export function useContact() {
  const { actor } = useActor(createActor);

  return useMutation<bigint | undefined, Error, ContactFormData>({
    mutationFn: (data: ContactFormData) => submitPortfolioContact(data, actor),
  });
}
