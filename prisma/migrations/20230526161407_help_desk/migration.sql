-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_call" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_call" ("author", "category", "description", "id", "title") SELECT "author", "category", "description", "id", "title" FROM "call";
DROP TABLE "call";
ALTER TABLE "new_call" RENAME TO "call";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
