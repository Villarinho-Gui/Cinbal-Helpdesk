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
    "file" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
