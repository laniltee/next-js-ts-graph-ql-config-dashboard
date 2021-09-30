// 1
const { PrismaClient } = require("@prisma/client");

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  const data = await prisma.configuration.findMany({ include: { tags: { include: {tag: true} } } });
  console.log(JSON.stringify(data, null, 4));
}

// 4
main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
