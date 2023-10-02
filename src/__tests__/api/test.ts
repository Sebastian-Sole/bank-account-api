import request from "supertest";
import { app } from "../../app";

const VALID_TRANSACTION = {
  cashAmount: 100,
  destinationAccount: 1,
  sourceAccount: 2,
};

const INVALID_TRANSACTION_AMOUNT = {
  cashAmount: -100,
  destinationAccount: 1,
  sourceAccount: 2,
};

const INVALID_TRANSACTION_ACCOUNT = {
  cashAmount: 100,
  destinationAccount: 1,
  sourceAccount: 1,
};

describe("Transaction endpoint", () => {
  it("should return 200 when transaction is valid and 400 when transaction is invalid", async () => {
    request(app).post("/transaction").send(VALID_TRANSACTION).expect(200);

    request(app)
      .post("/transaction")
      .send(INVALID_TRANSACTION_AMOUNT)
      .expect(400);

    request(app)
      .post("/transaction")
      .send(INVALID_TRANSACTION_ACCOUNT)
      .expect(400);
  });
});
