/*
  Warnings:

  - The values [KARYAWAN,DOKTER,OWNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `klinikId` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `labaBersih` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `pendapatan` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `pengeluaran` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `bulan` on the `LaporanPajak` table. All the data in the column will be lost.
  - You are about to drop the column `klinikId` on the `LaporanPajak` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `LaporanPajak` table. All the data in the column will be lost.
  - The `status` column on the `LaporanPajak` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `bukti` on the `PembayaranPajak` table. All the data in the column will be lost.
  - You are about to drop the column `pegawaiId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `JasaMedis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaporanBulanan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PKP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pegawai` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `perusahaanId` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalGaji` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPajak` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPendapatan` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah` to the `LaporanPajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perusahaanId` to the `LaporanPajak` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `jenis` on the `LaporanPajak` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisPajak" AS ENUM ('PPH21', 'PPH23', 'PPN');

-- CreateEnum
CREATE TYPE "StatusPajak" AS ENUM ('PENDING', 'LUNAS', 'TERLAMBAT');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'STAFF');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "LaporanBulanan" DROP CONSTRAINT "LaporanBulanan_klinikId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanHarian" DROP CONSTRAINT "LaporanHarian_klinikId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanPajak" DROP CONSTRAINT "LaporanPajak_klinikId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pegawaiId_fkey";

-- DropIndex
DROP INDEX "PembayaranPajak_laporanId_key";

-- DropIndex
DROP INDEX "User_pegawaiId_key";

-- AlterTable
ALTER TABLE "LaporanHarian" DROP COLUMN "klinikId",
DROP COLUMN "labaBersih",
DROP COLUMN "pendapatan",
DROP COLUMN "pengeluaran",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "perusahaanId" TEXT NOT NULL,
ADD COLUMN     "totalGaji" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPajak" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPendapatan" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "LaporanPajak" DROP COLUMN "bulan",
DROP COLUMN "klinikId",
DROP COLUMN "total",
ADD COLUMN     "dokumen" TEXT,
ADD COLUMN     "jumlah" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "perusahaanId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
DROP COLUMN "jenis",
ADD COLUMN     "jenis" "JenisPajak" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusPajak" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "PembayaranPajak" DROP COLUMN "bukti",
ADD COLUMN     "buktiBayar" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pegawaiId",
DROP COLUMN "token",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "perusahaanId" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STAFF';

-- DropTable
DROP TABLE "JasaMedis";

-- DropTable
DROP TABLE "LaporanBulanan";

-- DropTable
DROP TABLE "PKP";

-- DropTable
DROP TABLE "Pegawai";

-- DropEnum
DROP TYPE "PajakJenis";

-- DropEnum
DROP TYPE "PajakStatus";

-- DropEnum
DROP TYPE "StatusKerja";

-- CreateTable
CREATE TABLE "Perusahaan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "npwp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Perusahaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendapatan" (
    "id" TEXT NOT NULL,
    "perusahaanId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "sumber" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "pajak" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "jenisPajak" "JenisPajak",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pendapatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GajiPegawai" (
    "id" TEXT NOT NULL,
    "perusahaanId" TEXT NOT NULL,
    "pegawai" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "gajiPokok" DOUBLE PRECISION NOT NULL,
    "jasaBonus" DOUBLE PRECISION NOT NULL,
    "totalGaji" DOUBLE PRECISION NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "GajiPegawai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LaporanHarianToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LaporanHarianToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PendapatanToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PendapatanToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perusahaan_npwp_key" ON "Perusahaan"("npwp");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "_LaporanHarianToUser_B_index" ON "_LaporanHarianToUser"("B");

-- CreateIndex
CREATE INDEX "_PendapatanToUser_B_index" ON "_PendapatanToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanHarian" ADD CONSTRAINT "LaporanHarian_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendapatan" ADD CONSTRAINT "Pendapatan_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GajiPegawai" ADD CONSTRAINT "GajiPegawai_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GajiPegawai" ADD CONSTRAINT "GajiPegawai_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanPajak" ADD CONSTRAINT "LaporanPajak_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanPajak" ADD CONSTRAINT "LaporanPajak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LaporanHarianToUser" ADD CONSTRAINT "_LaporanHarianToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LaporanHarian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LaporanHarianToUser" ADD CONSTRAINT "_LaporanHarianToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PendapatanToUser" ADD CONSTRAINT "_PendapatanToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pendapatan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PendapatanToUser" ADD CONSTRAINT "_PendapatanToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
