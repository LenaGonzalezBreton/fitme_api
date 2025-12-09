import { prisma } from "../../infrastructure/db/prismaClient";
import type { CreateUserInput } from "./auth.schema";

export const AuthRepository = {
    async create(data: Omit<CreateUserInput, 'password'> & { passwordHash: string }) {
        return prisma.user.create({
            data: {
                ...data,
                firstName: data.firstName ?? null,
            },
        });
    },

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    },
};
