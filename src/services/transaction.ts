import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

export type Transaction = {
  sourceAccount: number;
  destinationAccount: number;
  cashAmount: number;
  registeredTime: number;
  isValidTransaction: boolean;
};

export const createTransaction = async ({
  cashAmount,
  destinationAccount,
  isValidTransaction,
  registeredTime,
  sourceAccount,
}: Transaction) => {
  return await prisma.transaction.create({
    data: {
      cashAmount,
      fromAccount: {
        connect: {
          id: sourceAccount,
        },
      },
      toAccount: {
        connect: {
          id: destinationAccount,
        },
      },
      registeredTime,
      executedTime: isValidTransaction ? moment().valueOf() : null,
      success: isValidTransaction,
    },
  });
};
