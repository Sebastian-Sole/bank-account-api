import { TransactionSchema } from "../../schemas/TransactionSchema";

export const validateTransactionData = (body: any) => {
  const parsedData = TransactionSchema.safeParse(body);

  if (!parsedData.success) {
    throw new Error("Invalid transaction data.");
  }

  return parsedData.data;
};
