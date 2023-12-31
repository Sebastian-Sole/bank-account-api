import z from "zod";

export const TransactionSchema = z.object({
  cashAmount: z.number(),
  sourceAccount: z.number(),
  destinationAccount: z.number(),
});

export type TransactionSchemaType = z.infer<typeof TransactionSchema>;
