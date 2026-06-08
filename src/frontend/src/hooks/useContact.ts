import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { createActor } from "../backend";
import { submitContact } from "../lib/contactSubmission";
import type { ContactFormData } from "../types/portfolio";

export function useContact() {
  const { actor } = useActor(createActor);

  return useMutation<bigint | undefined, Error, ContactFormData>({
    mutationFn: async (data: ContactFormData) => {
      return submitContact(data, actor);
    },
  });
}
