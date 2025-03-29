import CrudLaporan from "@/components/DemoTable";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const akunItems = [
  { kode: "1001", nama: "Kas", tipe: "Aktiva", saldo: 5000000 },
  { kode: "1002", nama: "Bank", tipe: "Aktiva", saldo: 10000000 },
  { kode: "2001", nama: "Piutang Usaha", tipe: "Aktiva", saldo: 2000000 },
  { kode: "3001", nama: "Persediaan Barang", tipe: "Aktiva", saldo: 3000000 },
  { kode: "4001", nama: "Peralatan Kantor", tipe: "Aktiva", saldo: 15000000 },
  {
    kode: "5001",
    nama: "Pendapatan Jasa",
    tipe: "Pendapatan",
    saldo: 12000000,
  },
  { kode: "5002", nama: "Penjualan Obat", tipe: "Pendapatan", saldo: 8000000 },
  {
    kode: "5003",
    nama: "Pembayaran Asuransi",
    tipe: "Pendapatan",
    saldo: 5000000,
  },
  {
    kode: "5004",
    nama: "Pemasukan Pelayanan",
    tipe: "Pendapatan",
    saldo: 9000000,
  },
  { kode: "5005", nama: "Tindakan Medis", tipe: "Pendapatan", saldo: 11000000 },
  {
    kode: "5006",
    nama: "Pemasukan dari Penjualan Alat Kesehatan",
    tipe: "Pendapatan",
    saldo: 4000000,
  },
  { kode: "5007", nama: "Sewa Alat Medis", tipe: "Pendapatan", saldo: 3000000 },
  {
    kode: "5008",
    nama: "Program Kesehatan Klinik",
    tipe: "Pendapatan",
    saldo: 6000000,
  },
  { kode: "6001", nama: "Beban Gaji", tipe: "Beban", saldo: -7000000 },
  { kode: "7001", nama: "Pajak Penghasilan", tipe: "Beban", saldo: -5000000 },
];

export default function AkunListPage() {
  return (
    <>
      <Box sx={{ p: 0 }}>
        {/* <Typography variant="h4" gutterBottom>
        Daftar Akun
      </Typography> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kode Akun</TableCell>
                <TableCell>Nama Akun</TableCell>
                <TableCell>Tipe</TableCell>
                <TableCell>Saldo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {akunItems.map((akun, index) => (
                <TableRow key={index}>
                  <TableCell>{akun.kode}</TableCell>
                  <TableCell>{akun.nama}</TableCell>
                  <TableCell>{akun.tipe}</TableCell>
                  <TableCell>
                    {akun.saldo.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CrudLaporan />
    </>
  );
}
