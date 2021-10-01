const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.tag.createMany({
    data: [["Tag X", "Tag Y"].map((tag) => ({ name: tag }))],
  });
  const data = await prisma.tag.findMany({});
  console.log(JSON.stringify(data, null, 4));
}

main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
