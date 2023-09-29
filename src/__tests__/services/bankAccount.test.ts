import { updateAccountCash } from "../../services/bankAccount";

jest.mock("@prisma/client", () => {
  const mockUpdate = jest.fn();

  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        account: {
          update: mockUpdate,
        },
        $disconnect: jest.fn(),
      };
    }),
    mockUpdate,
  };
});

const { mockUpdate } = jest.requireMock("@prisma/client");

describe("updateAccountCash", () => {
  it("should update account cash correctly", async () => {
    await updateAccountCash(1, 100);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { availableCash: { increment: 100 } },
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
