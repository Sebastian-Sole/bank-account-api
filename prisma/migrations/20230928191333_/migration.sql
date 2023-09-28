-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "availableCash" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registeredTime" INTEGER NOT NULL,
    "executedTime" INTEGER,
    "success" BOOLEAN NOT NULL,
    "cashAmount" REAL NOT NULL,
    "destinationAccount" INTEGER NOT NULL,
    "sourceAccount" INTEGER NOT NULL,
    CONSTRAINT "Transaction_sourceAccount_fkey" FOREIGN KEY ("sourceAccount") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
