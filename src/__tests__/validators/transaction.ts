import { validateTransactionData } from "../../utils/validators/transaction";

describe("validateTransactionData", () => {
  it("should validate correct transaction data", () => {
    const data = {
      cashAmount: 100,
      sourceAccount: 1,
      destinationAccount: 2,
    };
    const validation = validateTransactionData(data);
    expect(validation).toBeTruthy();
  });

  it("should return null for invalid transaction data", () => {
    const data = {
      cashAmount: -100,
      sourceAccount: 1,
      destinationAccount: 2,
    };
    const validation = validateTransactionData(data);

    expect(validation).toBeNull();
  });
});
