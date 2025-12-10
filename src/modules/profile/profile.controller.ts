import { FastifyReply, FastifyRequest } from 'fastify';
import { createOrUpdateProfile, getProfile } from './profile.service';
import { CreateProfileInput } from './profile.schema';

export async function upsertProfileHandler(
  request: FastifyRequest<{ Body: CreateProfileInput }>,
  reply: FastifyReply
) {
  // request.user est rempli par le plugin JWT (on force le typage ici)
  const user = request.user as { id: string };
  const body = request.body;

  try {
    const profile = await createOrUpdateProfile(user.id, body);
    return reply.code(200).send(profile);
  } catch (e) {
    console.error(e);
    return reply.code(500).send({ message: "Erreur lors de la sauvegarde du profil" });
  }
}

export async function getProfileHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user as { id: string };
  const profile = await getProfile(user.id);

  if (!profile) {
    return reply.code(404).send({ message: "Profil non trouvé" });
  }

  return reply.code(200).send(profile);
}