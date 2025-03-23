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
  id: number;
  noResep?: string;
  keterangan?: string;
  jasa: number;
  obat: number;
  lainLain?: number;
  tindakan?: number;
  lab?: number;
  nebu?: number;
  jumlah: number;
  diskon?: number;
  totalAkhir: number;
  adm2000?: number;
  adm3000?: number;
}

let laporanData: LaporanHarian[] = [
  {
    id: 1,
    jasa: 40000,
    obat: 25000,
    jumlah: 65000,
    totalAkhir: 70000,
  },
  {
    id: 2,
    jasa: 40000,
    obat: 30000,
    nebu: 50000,
    jumlah: 120000,
    totalAkhir: 125000,
  },
  {
    id: 5,
    noResep: "A Asep",
    keterangan: "hecting 14",
    jasa: 40000,
    obat: 25000,
    lainLain: 60000,
    tindakan: 295000,
    jumlah: 420000,
    totalAkhir: 425000,
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
