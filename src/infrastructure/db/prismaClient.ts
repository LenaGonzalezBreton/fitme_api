import { PrismaClient } from '@prisma/client';

// On ajoute un typage pour éviter que TypeScript ne râle sur l'objet global
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// On réutilise l'instance existante si elle est là (Singleton)
export const prisma = globalForPrisma.prisma || new PrismaClient();

// En mode dev, on sauvegarde l'instance dans global pour qu'elle survive au redémarrage automatique
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;