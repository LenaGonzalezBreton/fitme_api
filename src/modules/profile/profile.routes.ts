import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { upsertProfileHandler, getProfileHandler } from './profile.controller';
import { createProfileSchema, profileResponseSchema } from './profile.schema';

export async function profileRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  // VERROUILLAGE : Tout ce qui est dans ce bloc nécessite un token
  server.addHook('onRequest', async (request) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw err; // Renvoie une erreur 401 Unauthorized
    }
  });

  // POST /api/profile
  server.post('/', {
    schema: {
      body: createProfileSchema,
      response: {
        200: profileResponseSchema,
      },
    },
  }, upsertProfileHandler);

  // GET /api/profile
  server.get('/', {
    // Pas de body pour un GET
  }, getProfileHandler);
}