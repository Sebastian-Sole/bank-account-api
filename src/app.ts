import env from "./env";
import express, { json } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import moment from "moment";

const app = express();
const port = env.PORT;

app.use(cors());
app.use(json());

app.post("/", async (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/transaction", async (req, res) => {
  const registeredTime = moment().valueOf();
  const { destinationAccount, cashAmount, sourceAccount } = req.body;

  const fromAccount = await prisma.account.findUniqueOrThrow({
    where: {
      id: sourceAccount,
    },
  });

  const isValidTransaction = fromAccount.availableCash >= cashAmount;

  const toAccount = await prisma.account.findUniqueOrThrow({
    where: {
      id: destinationAccount,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      cashAmount,
      destinationAccount,
      sourceAccount,
      registeredTime,
      executedTime: isValidTransaction ? moment().valueOf() : null,
      success: isValidTransaction,
    },
  });

  if (!isValidTransaction) {
    return res.status(400).send({
      message: "Invalid transaction",
    });
  }

  const fromUpdate = await prisma.account.update({
    where: {
      id: sourceAccount,
    },
    data: {
      availableCash: fromAccount.availableCash - cashAmount,
    },
  });

  const toUpdate = await prisma.account.update({
    where: {
      id: destinationAccount,
    },
    data: {
      availableCash: toAccount.availableCash + cashAmount,
    },
  });

  res.status(200).send({
    data: {
      ...transaction,
      executedTime: moment(Number(transaction.executedTime!!)),
      registeredTime: moment(Number(transaction.registeredTime!!)),
    },
  });
});

app.listen(port, () => {
  console.log(`️🚀 [server]: Server is running at http://localhost:${port}`);
});
