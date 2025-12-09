import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const createUserSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
  firstName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: userResponseSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// MODIFICATION ICI : On a retiré le { $id: 'authSchemas' } à la fin
export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  loginSchema,
  userResponseSchema,
  loginResponseSchema,
});