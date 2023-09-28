-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registeredTime" BIGINT NOT NULL,
    "executedTime" BIGINT,
    "success" BOOLEAN NOT NULL,
    "cashAmount" REAL NOT NULL,
    "destinationAccount" INTEGER NOT NULL,
    "sourceAccount" INTEGER NOT NULL,
    CONSTRAINT "Transaction_destinationAccount_fkey" FOREIGN KEY ("destinationAccount") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_sourceAccount_fkey" FOREIGN KEY ("sourceAccount") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("cashAmount", "destinationAccount", "executedTime", "id", "registeredTime", "sourceAccount", "success") SELECT "cashAmount", "destinationAccount", "executedTime", "id", "registeredTime", "sourceAccount", "success" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
