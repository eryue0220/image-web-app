import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const img1 = await prisma.image.create({
    data: {
      img: Buffer.from('Hello'),
    },
  });

  const img2 = await prisma.image.create({
    data: {
      img: Buffer.from('World'),
    },
  });

  console.log('image::', img1, img2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
