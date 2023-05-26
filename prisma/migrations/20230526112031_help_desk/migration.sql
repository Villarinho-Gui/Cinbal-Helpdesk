/*
  Warnings:

  - You are about to drop the column `file` on the `call` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "callId" TEXT,
    CONSTRAINT "Files_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_call" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_call" ("author", "category", "description", "id", "title") SELECT "author", "category", "description", "id", "title" FROM "call";
DROP TABLE "call";
ALTER TABLE "new_call" RENAME TO "call";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
