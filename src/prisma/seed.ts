import { PrismaClient } from '../../prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'test@gmail.com',
      name: 'Test User',
    },
  });

  const chat = await prisma.chat.upsert({
    where: { id: 1 },
    update: {},
    create: {
      ownerId: user.id,
      messages: {
        create: {
          role: 'user',
          content: 'Hello world',
        },
      },
    },
  });
  console.log(chat);
}

main()
  .catch((e) => {
    // throw e;
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
