import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

async function main() {
  const fromAccount = await prisma.account.create({
    data: {
      availableCash: 1000,
      name: "User 1 Bank Account",
    },
  });

  const toAccount = await prisma.account.create({
    data: {
      availableCash: 1000,
      name: "User 2 Bank Account",
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      cashAmount: 100,
      sourceAccount: fromAccount.id,
      destinationAccount: toAccount.id,
      success: true,
      registeredTime: moment().valueOf(),
      executedTime: moment().valueOf(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
