import { FastifyInstance } from 'fastify';
import { registerHandler, loginHandler } from './auth.controller';
import { $ref } from './auth.schema';

export async function authRoutes(server: FastifyInstance) {

  server.post('/register', {
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: $ref('userResponseSchema'), // Filtre le passwordHash automatiquement !
      },
    },
  }, registerHandler);

  server.post('/login', {
    schema: {
      body: $ref('loginSchema'),
      response: {
        200: $ref('loginResponseSchema'),
      },
    },
  }, loginHandler);
}