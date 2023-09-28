import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const bankAccount = await prisma.bankAccount.create({
    data: {
      balance: 1000,
    },
  });

  const targetBankAccount = await prisma.bankAccount.create({
    data: {
      balance: 1000,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      amount: 100,
      to: bankAccount.id,
      from: targetBankAccount.id,
    },
  });

  console.log(bankAccount);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
