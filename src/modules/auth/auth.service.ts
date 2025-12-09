import { hashPassword, verifyPassword } from '../../utils/hash';
import type { CreateUserInput, LoginInput } from './auth.schema';
import { AuthRepository } from './auth.repository';

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  // 1. Hacher le mot de passe
  const passwordHash = await hashPassword(password);

  // 2. Créer l'user via le Repository
  const user = await AuthRepository.create({
    ...rest,
    passwordHash,
  });

  return user;
}

export async function findUserByEmail(email: string) {
  return AuthRepository.findByEmail(email);
}

export async function verifyUserCredentials(input: LoginInput) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    return null;
  }

  const isValidPassword = await verifyPassword(input.password, user.passwordHash);

  if (!isValidPassword) {
    return null;
  }

  return user;
}