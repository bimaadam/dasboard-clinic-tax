"use client";

import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { List } from "@toolpad/core/Crud";
import { useDemoRouter } from "@toolpad/core/internal";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export interface LaporanHarian {
  id: string;
  nama: string;
  alamat: string;
  nik: string;
  keluhan: string;
  dpjp: string;
  jeniskelamin: string;
  tanggalLahir: string;
  jenisPembayaran: string;
  tinggiBadan: number;
  beratBadan: number;
  sistole: number;
  diastole: number;
  lingkarPerut: number;
  imt: number;
  respiratoryRate: number;
  heartRate: number;
  saturasiOksigen: number;
  suhu: number;
  lingkarKepala: number;
  biayaLayanan: number;
  createdAt: string;
}

let laporanHarianData: LaporanHarian[] = [
  {
    id: "1",
    nama: "Bima Adam",
    alamat: "Boyolali",
    nik: "1234567890",
    keluhan: "Demam",
    dpjp: "Dr. Arie",
    jeniskelamin: "Laki-laki",
    tanggalLahir: "2002-10-01",
    jenisPembayaran: "BPJS",
    tinggiBadan: 170,
    beratBadan: 65,
    sistole: 120,
    diastole: 80,
    lingkarPerut: 85,
    imt: 22.5,
    respiratoryRate: 16,
    heartRate: 75,
    saturasiOksigen: 98,
    suhu: 36.5,
    lingkarKepala: 55,
    biayaLayanan: 150000,
    createdAt: "2025-03-15",
  },
];

export const laporanHarianDataSource = {
  fields: Object.keys(laporanHarianData[0]).map((key) => ({
    field: key,
    headerName: key.replace(/([A-Z])/g, " $1").trim(),
  })),
  getMany: ({ paginationModel }) => {
    return new Promise<{ items: LaporanHarian[]; itemCount: number }>(
      (resolve) => {
        setTimeout(() => {
          const start = paginationModel.page * paginationModel.pageSize;
          const end = start + paginationModel.pageSize;
          resolve({
            items: laporanHarianData.slice(start, end),
            itemCount: laporanHarianData.length,
          });
        }, 750);
      }
    );
  },
};

export default function LaporanHarianPage() {
  const router = useDemoRouter("/laporan-harian");
  return (
    <AppProvider router={router} theme={demoTheme}>
      <List<LaporanHarian>
        dataSource={laporanHarianDataSource}
        initialPageSize={5}
      />
    </AppProvider>
  );
}
