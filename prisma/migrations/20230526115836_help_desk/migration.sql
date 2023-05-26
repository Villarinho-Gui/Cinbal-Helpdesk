/*
  Warnings:

  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Files";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "callId" TEXT,
    CONSTRAINT "files_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
