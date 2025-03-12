/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Dokter` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Dokter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dokter" DROP COLUMN "createdAt",
DROP COLUMN "nama";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "dokterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_dokterId_fkey" FOREIGN KEY ("dokterId") REFERENCES "Dokter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
