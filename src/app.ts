import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import { authRoutes } from './modules/auth/auth.routes';
import { authSchemas } from './modules/auth/auth.schema';
import { profileRoutes } from './modules/profile/profile.routes';
import { ZodTypeProvider, validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';

const server = Fastify();

// Configurer le compilateur pour Zod
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// 1. Enregistrer le plugin JWT
// TODO: Mets "supersecret" dans ton .env (JWT_SECRET) !
server.register(fjwt, {
  secret: process.env.JWT_SECRET || 'supersecret_change_me_in_prod',
});

// 2. Ajouter les schemas Zod au serveur
// Cela permet de les référencer via $ref dans les routes
for (const schema of authSchemas) {
  server.addSchema(schema);
}

// 3. Enregistrer les routes
server.register(authRoutes, { prefix: 'api/auth' });
server.withTypeProvider<ZodTypeProvider>().register(profileRoutes, { prefix: 'api/profile' });
// Healthcheck
server.get('/health', async () => {
  return { status: 'ok', service: 'fitme-api' };
});

export default server;