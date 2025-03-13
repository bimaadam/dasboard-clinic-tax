/*
  Warnings:

  - You are about to drop the `Dokter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "JenisPajak" AS ENUM ('PPH21', 'PPH23', 'PPN');

-- CreateEnum
CREATE TYPE "StatusPajak" AS ENUM ('PENDING', 'LUNAS', 'TERLAMBAT');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_dokterId_fkey";

-- DropTable
DROP TABLE "Dokter";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',
    "perusahaanId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "LaporanHarian" (
    "id" TEXT NOT NULL,
    "perusahaanId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "totalPendapatan" DOUBLE PRECISION NOT NULL,
    "totalGaji" DOUBLE PRECISION NOT NULL,
    "totalPajak" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LaporanHarian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendapatan" (
    "id" TEXT NOT NULL,
    "perusahaanId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "sumber" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
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

    CONSTRAINT "GajiPegawai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaporanPajak" (
    "id" TEXT NOT NULL,
    "perusahaanId" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "jenis" "JenisPajak" NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "status" "StatusPajak" NOT NULL DEFAULT 'PENDING',
    "dokumen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LaporanPajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PembayaranPajak" (
    "id" TEXT NOT NULL,
    "laporanId" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "tanggalBayar" TIMESTAMP(3) NOT NULL,
    "buktiBayar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PembayaranPajak_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_GajiPegawaiToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GajiPegawaiToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LaporanPajakToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LaporanPajakToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Perusahaan_npwp_key" ON "Perusahaan"("npwp");

-- CreateIndex
CREATE INDEX "_LaporanHarianToUser_B_index" ON "_LaporanHarianToUser"("B");

-- CreateIndex
CREATE INDEX "_PendapatanToUser_B_index" ON "_PendapatanToUser"("B");

-- CreateIndex
CREATE INDEX "_GajiPegawaiToUser_B_index" ON "_GajiPegawaiToUser"("B");

-- CreateIndex
CREATE INDEX "_LaporanPajakToUser_B_index" ON "_LaporanPajakToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanHarian" ADD CONSTRAINT "LaporanHarian_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendapatan" ADD CONSTRAINT "Pendapatan_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GajiPegawai" ADD CONSTRAINT "GajiPegawai_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanPajak" ADD CONSTRAINT "LaporanPajak_perusahaanId_fkey" FOREIGN KEY ("perusahaanId") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembayaranPajak" ADD CONSTRAINT "PembayaranPajak_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "LaporanPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LaporanHarianToUser" ADD CONSTRAINT "_LaporanHarianToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LaporanHarian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LaporanHarianToUser" ADD CONSTRAINT "_LaporanHarianToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PendapatanToUser" ADD CONSTRAINT "_PendapatanToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pendapatan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PendapatanToUser" ADD CONSTRAINT "_PendapatanToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GajiPegawaiToUser" ADD CONSTRAINT "_GajiPegawaiToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GajiPegawai"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GajiPegawaiToUser" ADD CONSTRAINT "_GajiPegawaiToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LaporanPajakToUser" ADD CONSTRAINT "_LaporanPajakToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LaporanPajak"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LaporanPajakToUser" ADD CONSTRAINT "_LaporanPajakToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
