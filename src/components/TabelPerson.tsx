"use client";

import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const theme = createTheme();

const fetchLaporanHarian = async () => {
  try {
    const res = await fetch("/api/laporan-harian");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function LaporanHarianPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLaporanHarian().then(setData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} sx={{ mt: 4, maxWidth: "90%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Nomor Resep</TableCell>
              <TableCell>Nama Pasien</TableCell>
              <TableCell>Dokter</TableCell>
              <TableCell>Asisten</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{new Date(row.tanggal).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>{row.nomor_resep}</TableCell>
                <TableCell>{row.nama_pasien}</TableCell>
                <TableCell>{row.dokter}</TableCell>
                <TableCell>{row.asisten}</TableCell>
                <TableCell>{row.total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
