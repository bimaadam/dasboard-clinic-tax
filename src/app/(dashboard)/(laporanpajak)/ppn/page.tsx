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

const ppnItems = [
  { kode: "9001", nama: "Penyerahan Barang Kena Pajak", tarif: "11%" },
  { kode: "9002", nama: "Penyerahan Jasa Kena Pajak", tarif: "11%" },
  { kode: "9003", nama: "Impor Barang Kena Pajak", tarif: "11%" },
  { kode: "9004", nama: "Pemanfaatan BKP Tidak Berwujud", tarif: "11%" },
  {
    kode: "9005",
    nama: "Pemanfaatan JKP dari Luar Daerah Pabean",
    tarif: "11%",
  },
  { kode: "9006", nama: "Ekspor Barang Kena Pajak", tarif: "0%" },
  { kode: "9007", nama: "Ekspor Jasa Kena Pajak", tarif: "0%" },
];

export default function PPNPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        PPN - Pajak Pertambahan Nilai
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kode Akun</TableCell>
              <TableCell>Nama Akun</TableCell>
              <TableCell>Tarif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ppnItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.tarif}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
