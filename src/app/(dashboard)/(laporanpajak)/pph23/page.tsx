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

const pph23Items = [
  {
    kode: "8001",
    nama: "Jasa Teknik",
    kategori: "Pendapatan Kena Pajak",
    tarif: "2%",
  },
  {
    kode: "8002",
    nama: "Jasa Manajemen",
    kategori: "Pendapatan Kena Pajak",
    tarif: "2%",
  },
  {
    kode: "8003",
    nama: "Jasa Konsultan",
    kategori: "Pendapatan Kena Pajak",
    tarif: "2%",
  },
  {
    kode: "8004",
    nama: "Royalti",
    kategori: "Pendapatan Kena Pajak",
    tarif: "15%",
  },
  {
    kode: "8005",
    nama: "Sewa dan Penghasilan Lain",
    kategori: "Pendapatan Kena Pajak",
    tarif: "10%",
  },
  {
    kode: "8006",
    nama: "Dividen",
    kategori: "Pendapatan Kena Pajak",
    tarif: "15%",
  },
  {
    kode: "8007",
    nama: "Bunga",
    kategori: "Pendapatan Kena Pajak",
    tarif: "15%",
  },
  {
    kode: "8008",
    nama: "Hadiah dan Penghargaan",
    kategori: "Pendapatan Kena Pajak",
    tarif: "15%",
  },
];

export default function PPH23Page() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        PPH 23 - Pajak Penghasilan atas Jasa dan Royalti
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
            {pph23Items.map((item, index) => (
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
