import app from './app';
import { prisma } from './infrastructure/db/prismaClient'; // Ajoute cet import

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    console.log('1. Démarrage du serveur...');

    // On teste la connexion DB explicitement
    console.log('2. Tentative de connexion DB...');
    await prisma.$connect();
    console.log('3. Connexion DB réussie !');

    await app.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`🚀 Server listening at http://127.0.0.1:${PORT}`);
  } catch (err) {
    console.error('ERREUR FATALE :', err); // On verra l'erreur exacte
    process.exit(1);
  }
};

start();