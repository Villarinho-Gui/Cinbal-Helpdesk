/*
  Warnings:

  - You are about to alter the column `createdAt` on the `call` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `call` MODIFY `createdAt` DATETIME NOT NULL;
