import { prisma } from '../../infrastructure/db/prismaClient';
import { CreateProfileInput } from './profile.schema';

export async function createOrUpdateProfile(userId: string, input: CreateProfileInput) {
  // On extrait les dates pour les convertir en objets Date JS
  const { birthDate, lastPeriodDate, ...rest } = input;

  return prisma.userProfile.upsert({
    where: { userId },
    update: {
      ...rest,
      birthDate: new Date(birthDate),
      lastPeriodDate: new Date(lastPeriodDate),
    },
    create: {
      userId,
      ...rest,
      birthDate: new Date(birthDate),
      lastPeriodDate: new Date(lastPeriodDate),
    },
  });
}

export async function getProfile(userId: string) {
  return prisma.userProfile.findUnique({
    where: { userId },
  });
}