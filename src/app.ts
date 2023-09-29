import env from "./env";
import express, { json } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import moment from "moment";
import {
  getBankAccountFromId,
  updateAccountCash,
} from "./services/bankAccount";
import { createTransaction } from "./services/transaction";
import { validateTransactionData } from "./utils/validators/transaction";

const app = express();
const port = env.PORT;

app.use(cors());
app.use(json());

app.post("/", async (req, res) => {
  res.status(200).send("Hello World");
});

// Transaction endpoint
app.post("/transaction", async (req, res) => {
  try {
    const registeredTime = moment().valueOf();

    const { destinationAccount, cashAmount, sourceAccount } =
      validateTransactionData(req.body);

    const fromAccount = await getBankAccountFromId(sourceAccount);

    const isValidTransaction = fromAccount.availableCash >= cashAmount;

    const transaction = await createTransaction({
      cashAmount,
      destinationAccount,
      isValidTransaction,
      registeredTime,
      sourceAccount,
    });

    if (!isValidTransaction) {
      return res.status(400).send({
        message: "Invalid transaction",
      });
    }

    await updateAccountCash(sourceAccount, -cashAmount);
    await updateAccountCash(destinationAccount, cashAmount);

    res.status(200).send({
      data: {
        ...transaction,
        executedTime: moment(Number(transaction.executedTime!!)),
        registeredTime: moment(Number(transaction.registeredTime!!)),
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`️🚀 [server]: Server is running at http://localhost:${port}`);
});
