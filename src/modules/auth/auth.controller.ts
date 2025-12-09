import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findUserByEmail, verifyUserCredentials } from './auth.service';
import { CreateUserInput, LoginInput } from './auth.schema';

export async function registerHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    // Vérifier si l'user existe déjà pour éviter une erreur SQL brute
    const existingUser = await findUserByEmail(body.email);
    if (existingUser) {
      return reply.code(409).send({ message: "Cet email est déjà utilisé." });
    }

    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  // Vérification credentials
  const user = await verifyUserCredentials(body);

  if (!user) {
    return reply.code(401).send({
      message: "Email ou mot de passe incorrect",
    });
  }

  // Génération du JWT (payload simple)
  // `request.jwt` vient du plugin @fastify/jwt qu'on va configurer juste après
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
  };

  const accessToken = request.server.jwt.sign(payload);

  return { accessToken, user }; // Correspond à notre schema loginResponseSchema
}