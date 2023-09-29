import { Transaction, createTransaction } from "../../services/transaction";

jest.mock("@prisma/client", () => {
  const mockUpdate = jest.fn();
  const mockCreate = jest.fn();

  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        transaction: {
          create: mockCreate,
        },
        $disconnect: jest.fn(),
      };
    }),
    mockUpdate,
    mockCreate,
  };
});

const { mockCreate } = jest.requireMock("@prisma/client");

describe("createTransaction", () => {
  it("should create transaction correctly", async () => {
    const data: Transaction = {
      cashAmount: 100,
      destinationAccount: 2,
      isValidTransaction: true,
      registeredTime: 123456789,
      sourceAccount: 1,
    };
    await createTransaction(data);
    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        cashAmount: 100,
        fromAccount: { connect: { id: 1 } },
        toAccount: { connect: { id: 2 } },
        registeredTime: 123456789,
        success: true,
        executedTime: expect.any(Number),
      }),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
