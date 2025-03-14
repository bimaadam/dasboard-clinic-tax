/*
  Warnings:

  - The values [STAFF] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `perusahaanId` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `totalGaji` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `totalPajak` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `totalPendapatan` on the `LaporanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `dokumen` on the `LaporanPajak` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah` on the `LaporanPajak` table. All the data in the column will be lost.
  - You are about to drop the column `perusahaanId` on the `LaporanPajak` table. All the data in the column will be lost.
  - You are about to drop the column `buktiBayar` on the `PembayaranPajak` table. All the data in the column will be lost.
  - You are about to drop the column `perusahaanId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `GajiPegawai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pendapatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Perusahaan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GajiPegawaiToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LaporanHarianToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LaporanPajakToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PendapatanToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[laporanId]` on the table `PembayaranPajak` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pegawaiId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `klinikId` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendapatan` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengeluaran` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `LaporanPajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `klinikId` to the `LaporanPajak` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `jenis` on the `LaporanPajak` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `LaporanPajak` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusKerja" AS ENUM ('TETAP', 'KONTRAK', 'FREELANCE');

-- CreateEnum
CREATE TYPE "PajakJenis" AS ENUM ('PPH21', 'PPH23', 'PPN');

-- CreateEnum
CREATE TYPE "PajakStatus" AS ENUM ('BELUM_DIBAYAR', 'DIBAYAR', 'LAPOR_SPT');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'KARYAWAN', 'DOKTER', 'OWNER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "GajiPegawai" DROP CONSTRAINT "GajiPegawai_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanHarian" DROP CONSTRAINT "LaporanHarian_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanPajak" DROP CONSTRAINT "LaporanPajak_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "Pendapatan" DROP CONSTRAINT "Pendapatan_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_perusahaanId_fkey";

-- DropForeignKey
ALTER TABLE "_GajiPegawaiToUser" DROP CONSTRAINT "_GajiPegawaiToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GajiPegawaiToUser" DROP CONSTRAINT "_GajiPegawaiToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_LaporanHarianToUser" DROP CONSTRAINT "_LaporanHarianToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LaporanHarianToUser" DROP CONSTRAINT "_LaporanHarianToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_LaporanPajakToUser" DROP CONSTRAINT "_LaporanPajakToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LaporanPajakToUser" DROP CONSTRAINT "_LaporanPajakToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PendapatanToUser" DROP CONSTRAINT "_PendapatanToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PendapatanToUser" DROP CONSTRAINT "_PendapatanToUser_B_fkey";

-- AlterTable
ALTER TABLE "LaporanHarian" DROP COLUMN "createdAt",
DROP COLUMN "perusahaanId",
DROP COLUMN "totalGaji",
DROP COLUMN "totalPajak",
DROP COLUMN "totalPendapatan",
ADD COLUMN     "klinikId" TEXT NOT NULL,
ADD COLUMN     "labaBersih" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "pendapatan" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pengeluaran" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "LaporanPajak" DROP COLUMN "dokumen",
DROP COLUMN "jumlah",
DROP COLUMN "perusahaanId",
ADD COLUMN     "bulan" INTEGER NOT NULL,
ADD COLUMN     "klinikId" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
DROP COLUMN "jenis",
ADD COLUMN     "jenis" "PajakJenis" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PajakStatus" NOT NULL;

-- AlterTable
ALTER TABLE "PembayaranPajak" DROP COLUMN "buktiBayar",
ADD COLUMN     "bukti" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "perusahaanId",
ADD COLUMN     "pegawaiId" TEXT,
ALTER COLUMN "role" DROP DEFAULT;

-- DropTable
DROP TABLE "GajiPegawai";

-- DropTable
DROP TABLE "Pendapatan";

-- DropTable
DROP TABLE "Perusahaan";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "_GajiPegawaiToUser";

-- DropTable
DROP TABLE "_LaporanHarianToUser";

-- DropTable
DROP TABLE "_LaporanPajakToUser";

-- DropTable
DROP TABLE "_PendapatanToUser";

-- DropEnum
DROP TYPE "JenisPajak";

-- DropEnum
DROP TYPE "StatusPajak";

-- CreateTable
CREATE TABLE "Pegawai" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "npwp" TEXT,
    "gajiTotal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "pph21" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Pegawai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JasaMedis" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "biaya" DOUBLE PRECISION NOT NULL,
    "pph23" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JasaMedis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaporanBulanan" (
    "id" TEXT NOT NULL,
    "bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "totalPendapatan" DOUBLE PRECISION NOT NULL,
    "totalGaji" DOUBLE PRECISION NOT NULL,
    "totalLaba" DOUBLE PRECISION NOT NULL,
    "totalPajak" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "klinikId" TEXT NOT NULL,

    CONSTRAINT "LaporanBulanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PKP" (
    "id" TEXT NOT NULL,
    "namaKlinik" TEXT NOT NULL,
    "npwp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "tarifPpn" DOUBLE PRECISION NOT NULL DEFAULT 0.11,
    "tarifPph21" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
    "tarifPph23" DOUBLE PRECISION NOT NULL DEFAULT 0.02,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PKP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PembayaranPajak_laporanId_key" ON "PembayaranPajak"("laporanId");

-- CreateIndex
CREATE UNIQUE INDEX "User_pegawaiId_key" ON "User"("pegawaiId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pegawaiId_fkey" FOREIGN KEY ("pegawaiId") REFERENCES "Pegawai"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanHarian" ADD CONSTRAINT "LaporanHarian_klinikId_fkey" FOREIGN KEY ("klinikId") REFERENCES "PKP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanBulanan" ADD CONSTRAINT "LaporanBulanan_klinikId_fkey" FOREIGN KEY ("klinikId") REFERENCES "PKP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanPajak" ADD CONSTRAINT "LaporanPajak_klinikId_fkey" FOREIGN KEY ("klinikId") REFERENCES "PKP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
