import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(candidatePassword: string, hash: string) {
  return bcrypt.compare(candidatePassword, hash);
}