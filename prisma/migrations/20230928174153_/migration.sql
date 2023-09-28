/*
  Warnings:

  - You are about to drop the column `name` on the `BankAccount` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BankAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "balance" REAL NOT NULL
);
INSERT INTO "new_BankAccount" ("balance", "createdAt", "id", "updatedAt") SELECT "balance", "createdAt", "id", "updatedAt" FROM "BankAccount";
DROP TABLE "BankAccount";
ALTER TABLE "new_BankAccount" RENAME TO "BankAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
