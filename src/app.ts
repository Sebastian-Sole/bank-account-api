import env from "./env";
import express, { json } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
const port = env.PORT;

app.use(cors());
app.use(json());

app.post("/", async (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/transaction", async (req, res) => {
  const { to, amount, from } = req.body;

  const fromAccount = await prisma.bankAccount.findUniqueOrThrow({
    where: {
      id: from,
    },
  });

  if (fromAccount.balance < amount) {
    res.status(400).send({ message: "Insufficient funds" });
    return;
  }

  const toAccount = await prisma.bankAccount.findUniqueOrThrow({
    where: {
      id: to,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      to,
      from,
    },
  });

  const fromUpdate = await prisma.bankAccount.update({
    where: {
      id: from,
    },
    data: {
      balance: fromAccount.balance - amount,
    },
  });

  const toUpdate = await prisma.bankAccount.update({
    where: {
      id: to,
    },
    data: {
      balance: toAccount.balance + amount,
    },
  });

  res.status(200).send({
    transaction,
  });
});

app.listen(port, () => {
  console.log(`️🚀 [server]: Server is running at http://localhost:${port}`);
});
