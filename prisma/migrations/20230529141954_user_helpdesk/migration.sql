-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "extension" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "sector" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "call" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "callId" TEXT,
    CONSTRAINT "files_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
