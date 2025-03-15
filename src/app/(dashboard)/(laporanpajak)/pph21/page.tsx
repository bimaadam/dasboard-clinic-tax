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

const pph21Items = [
  {
    kode: "7001",
    nama: "Gaji Pokok",
    kategori: "Pendapatan Kena Pajak",
    tarif: "5%",
  },
  {
    kode: "7002",
    nama: "Tunjangan Jabatan",
    kategori: "Pendapatan Kena Pajak",
    tarif: "5%",
  },
  {
    kode: "7003",
    nama: "Tunjangan Kesehatan",
    kategori: "Pendapatan Kena Pajak",
    tarif: "5%",
  },
  {
    kode: "7004",
    nama: "Bonus dan THR",
    kategori: "Pendapatan Kena Pajak",
    tarif: "10%",
  },
  {
    kode: "7005",
    nama: "Jasa Konsultan",
    kategori: "Pendapatan Kena Pajak",
    tarif: "15%",
  },
  {
    kode: "7006",
    nama: "Potongan BPJS Ketenagakerjaan",
    kategori: "Pengurang Pajak",
    tarif: "-",
  },
  {
    kode: "7007",
    nama: "Potongan BPJS Kesehatan",
    kategori: "Pengurang Pajak",
    tarif: "-",
  },
  {
    kode: "7008",
    nama: "Pajak yang Dibayarkan Perusahaan",
    kategori: "Pengurang Pajak",
    tarif: "-",
  },
];

export default function PPH21Page() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        PPH 21 - Pajak Penghasilan Karyawan
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kode Akun</TableCell>
              <TableCell>Nama Akun</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Tarif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pph21Items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.kategori}</TableCell>
                <TableCell>{item.tarif}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
