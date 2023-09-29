import { validateTransactionData } from "../../utils/validators/transaction";

describe("validateTransactionData", () => {
  it("should validate correct transaction data", () => {
    const data = {
      cashAmount: 100,
      sourceAccount: 1,
      destinationAccount: 2,
    };
    expect(() => validateTransactionData(data)).not.toThrow();
  });

  it("should throw error for invalid transaction data", () => {
    const data = {
      cashAmount: -100,
      sourceAccount: 1,
      destinationAccount: 2,
    };
    expect(() => validateTransactionData(data)).toThrow(
      "Invalid transaction data."
    );
  });
});
