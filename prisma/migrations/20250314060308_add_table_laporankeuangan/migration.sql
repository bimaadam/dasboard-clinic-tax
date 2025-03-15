/*
  Warnings:

  - You are about to drop the `_LaporanHarianToUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `GajiPegawai` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `LaporanHarian` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `LaporanPajak` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "JenisPembayaran" AS ENUM ('BPJS', 'YATIM', 'UMUM', 'ADMIN', 'ASURANSI');

-- DropForeignKey
ALTER TABLE "GajiPegawai" DROP CONSTRAINT "GajiPegawai_userId_fkey";

-- DropForeignKey
ALTER TABLE "LaporanPajak" DROP CONSTRAINT "LaporanPajak_userId_fkey";

-- DropForeignKey
ALTER TABLE "_LaporanHarianToUser" DROP CONSTRAINT "_LaporanHarianToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LaporanHarianToUser" DROP CONSTRAINT "_LaporanHarianToUser_B_fkey";

-- AlterTable
ALTER TABLE "GajiPegawai" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LaporanHarian" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LaporanPajak" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "_LaporanHarianToUser";

-- CreateTable
CREATE TABLE "Pasien" (
    "id" TEXT NOT NULL,
    "laporanHarianId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "keluhan" TEXT NOT NULL,
    "dpjp" TEXT NOT NULL,
    "jeniskelamin" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "jenisPembayaran" "JenisPembayaran" NOT NULL,
    "tinggiBadan" DOUBLE PRECISION NOT NULL,
    "beratBadan" DOUBLE PRECISION NOT NULL,
    "sistole" INTEGER NOT NULL,
    "diastole" INTEGER NOT NULL,
    "lingkarPerut" DOUBLE PRECISION NOT NULL,
    "imt" DOUBLE PRECISION NOT NULL,
    "respiratoryRate" INTEGER NOT NULL,
    "heartRate" INTEGER NOT NULL,
    "saturasiOksigen" INTEGER NOT NULL,
    "suhu" DOUBLE PRECISION NOT NULL,
    "lingkarKepala" DOUBLE PRECISION NOT NULL,
    "biayaLayanan" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaporanKeuangan" (
    "id" TEXT NOT NULL,
    "perusahaanId" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "totalPendapatan" DOUBLE PRECISION NOT NULL,
    "totalGaji" DOUBLE PRECISION NOT NULL,
    "totalPajak" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "laporanPajakId" TEXT,

    CONSTRAINT "LaporanKeuangan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_nik_key" ON "Pasien"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "LaporanKeuangan_laporanPajakId_key" ON "LaporanKeuangan"("laporanPajakId");

-- AddForeignKey
ALTER TABLE "LaporanHarian" ADD CONSTRAINT "LaporanHarian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pasien" ADD CONSTRAINT "Pasien_laporanHarianId_fkey" FOREIGN KEY ("laporanHarianId") REFERENCES "LaporanHarian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GajiPegawai" ADD CONSTRAINT "GajiPegawai_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanKeuangan" ADD CONSTRAINT "LaporanKeuangan_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanKeuangan" ADD CONSTRAINT "LaporanKeuangan_laporanPajakId_fkey" FOREIGN KEY ("laporanPajakId") REFERENCES "LaporanPajak"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanPajak" ADD CONSTRAINT "LaporanPajak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
