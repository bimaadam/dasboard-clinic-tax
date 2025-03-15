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

const penggajianItems = [
  { kode: "6001", nama: "Gaji Dokter", kategori: "Beban" },
  { kode: "6002", nama: "Gaji Perawat", kategori: "Beban" },
  { kode: "6003", nama: "Gaji Administrasi", kategori: "Beban" },
  { kode: "6004", nama: "Gaji Tenaga Kebersihan", kategori: "Beban" },
  { kode: "6005", nama: "Tunjangan Kesehatan Karyawan", kategori: "Beban" },
  { kode: "6006", nama: "Bonus Karyawan", kategori: "Beban" },
  { kode: "6007", nama: "Lembur Karyawan", kategori: "Beban" },
];

export default function Penggajian() {
  return (
    <Box sx={{ p: 0 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kode Akun</TableCell>
              <TableCell>Nama Akun</TableCell>
              <TableCell>Kategori</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {penggajianItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.kategori}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
