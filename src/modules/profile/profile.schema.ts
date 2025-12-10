import { z } from 'zod';

export const createProfileSchema = z.object({
  birthDate: z.string().datetime(), // Format ISO (ex: 1995-12-25T00:00:00Z)
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  isRegular: z.boolean().default(true),
  cycleDuration: z.number().min(21).max(45).default(28),
  periodDuration: z.number().min(2).max(10).default(5),
  lastPeriodDate: z.string().datetime(), // TRES IMPORTANT pour le calcul
  goal: z.string().optional(),
});

export const profileResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  cycleDuration: z.number(),
  lastPeriodDate: z.date(),
  isRegular: z.boolean(),
  // Ajoute d'autres champs ici si tu veux les renvoyer au front
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;