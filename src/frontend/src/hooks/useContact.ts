import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ContactFormData } from "../types/portfolio";

export function useContact() {
  const { actor } = useActor(createActor);

  return useMutation<bigint, Error, ContactFormData>({
    mutationFn: async ({ name, email, message }: ContactFormData) => {
      if (!actor) throw new Error("Backend not available");
      return actor.submitContact(name, email, message);
    },
  });
}
