import { z } from "zod";

// ── Zod Schema ────────────────────────────────────────────────────────────────

export const deletionSchema = z.object({
  email: z.email("Ingresa un correo electrónico válido"),
});

export type DeletionFormData = z.infer<typeof deletionSchema>;
