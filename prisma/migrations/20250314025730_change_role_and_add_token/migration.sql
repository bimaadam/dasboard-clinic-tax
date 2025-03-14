/*
  Warnings:

  - You are about to alter the column `token` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.
  - Made the column `token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_token_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "token" SET NOT NULL,
ALTER COLUMN "token" SET DEFAULT '',
ALTER COLUMN "token" SET DATA TYPE VARCHAR(8);
