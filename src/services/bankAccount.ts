import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getBankAccountFromId = async (accountId: number) => {
  return await prisma.account.findUniqueOrThrow({
    where: {
      id: accountId,
    },
  });
};

export const updateAccountCash = async (
  accountId: number,
  cashChange: number
) => {
  return await prisma.account.update({
    where: { id: accountId },
    data: { availableCash: { increment: cashChange } },
  });
};
