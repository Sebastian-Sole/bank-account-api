import { TransactionSchema } from "../../schemas/TransactionSchema";

export const validateTransactionData = (body: any) => {
  const parsedData = TransactionSchema.safeParse(body);

  if (!parsedData.success) {
    return null;
  }

  return parsedData.data;
};
