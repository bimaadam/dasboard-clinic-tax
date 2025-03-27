/*
  Warnings:

  - You are about to drop the column `perusahaanId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `GajiPegawai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaporanHarian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaporanKeuangan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaporanPajak` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pasien` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PembayaranPajak` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pendapatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Perusahaan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PendapatanToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DOKTER';

-- DropForeignKey
ALTER TABLE "GajiPegawai" DROP CONSTRAINT "GajiPegawai_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "GajiPegawai" DROP CONSTRAINT "GajiPegawai_userId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanHarian" DROP CONSTRAINT "LaporanHarian_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanHarian" DROP CONSTRAINT "LaporanHarian_userId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanKeuangan" DROP CONSTRAINT "LaporanKeuangan_laporanPajakId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanKeuangan" DROP CONSTRAINT "LaporanKeuangan_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanPajak" DROP CONSTRAINT "LaporanPajak_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanPajak" DROP CONSTRAINT "LaporanPajak_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pasien" DROP CONSTRAINT "Pasien_laporanHarianId_fkey";

-- DropForeignKey
ALTER TABLE "PembayaranPajak" DROP CONSTRAINT "PembayaranPajak_laporanId_fkey";

-- DropForeignKey
ALTER TABLE "Pendapatan" DROP CONSTRAINT "Pendapatan_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "_PendapatanToUser" DROP CONSTRAINT "_PendapatanToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PendapatanToUser" DROP CONSTRAINT "_PendapatanToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "perusahaanId",
ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- DropTable
DROP TABLE "GajiPegawai";

-- DropTable
DROP TABLE "LaporanHarian";

-- DropTable
DROP TABLE "LaporanKeuangan";

-- DropTable
DROP TABLE "LaporanPajak";

-- DropTable
DROP TABLE "Pasien";

-- DropTable
DROP TABLE "PembayaranPajak";

-- DropTable
DROP TABLE "Pendapatan";

-- DropTable
DROP TABLE "Perusahaan";

-- DropTable
DROP TABLE "_PendapatanToUser";

-- DropEnum
DROP TYPE "JenisPajak";

-- DropEnum
DROP TYPE "JenisPembayaran";

-- DropEnum
DROP TYPE "StatusPajak";
