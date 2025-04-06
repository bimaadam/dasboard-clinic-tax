"use client";

import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, CircularProgress, Button, Modal, Box, TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getLaporan, hapusLaporan, tambahLaporan, editLaporan } from "@/lib/api";
import { formatIDR } from "@/utils/format";

interface Laporan {
  id?: number;
  tanggal: string;
  nomor_resep: string;
  nama_pasien: string;
  dokter: string;
  nama_asisten: string;
  jasa: number | string;
  obat: number | string;
  lain_lain: number | string;
  tindakan: number | string;
  lab: number | string;
  nebu: number | string;
  total: number | string;
}

const emptyForm: Laporan = {
  tanggal: "",
  nomor_resep: "",
  nama_pasien: "",
  dokter: "",
  nama_asisten: "",
  jasa: 0,
  obat: 0,
  lain_lain: 0,
  tindakan: 0,
  lab: 0,
  nebu: 0,
  total: 0,
};

export default function LaporanTable() {
  const [data, setData] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Laporan>(emptyForm);

  const loadData = async () => {
    setLoading(true);
    const res = await getLaporan();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Yakin mau hapus data ini?");
    if (confirmed) {
      const success = await hapusLaporan(id);
      if (success) loadData();
    }
  };

  const handleSubmit = async () => {
    if (form.id) {
      await editLaporan(form.id, form);
    } else {
      await tambahLaporan(form);
    }
    setOpen(false);
    setForm(emptyForm);
    loadData();
  };

  const handleOpenEdit = (row: Laporan) => {
    setForm(row);
    setOpen(true);
  };

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Tambah Laporan
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tanggal</TableCell>
                <TableCell>No. Resep</TableCell>
                <TableCell>Pasien</TableCell>
                <TableCell>Dokter</TableCell>
                <TableCell>Asisten</TableCell>
                <TableCell>Jasa</TableCell>
                <TableCell>Obat</TableCell>
                <TableCell>Lain-lain</TableCell>
                <TableCell>Tindakan</TableCell>
                <TableCell>Lab</TableCell>
                <TableCell>Nebu</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.tanggal.slice(0, 10)}</TableCell>
                  <TableCell>{row.nomor_resep}</TableCell>
                  <TableCell>{row.nama_pasien}</TableCell>
                  <TableCell>{row.dokter}</TableCell>
                  <TableCell>{row.nama_asisten}</TableCell>
                  <TableCell>{formatIDR(row.jasa)}</TableCell>
                  <TableCell>{formatIDR(row.obat)}</TableCell>
                  <TableCell>{formatIDR(row.lain_lain)}</TableCell>
                  <TableCell>{formatIDR(row.tindakan)}</TableCell>
                  <TableCell>{formatIDR(row.lab)}</TableCell>
                  <TableCell>{formatIDR(row.nebu)}</TableCell>
                  <TableCell>{formatIDR(row.total)}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row.id!)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal Form Tambah/Edit */}
      <Modal open={open} onClose={() => { setOpen(false); setForm(emptyForm); }}>
        <Box sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, bgcolor: 'background.paper',
          boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <h2>{form.id ? "Edit Laporan" : "Tambah Laporan"}</h2>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField label="Tanggal" type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} InputLabelProps={{ shrink: true }} />
            <TextField label="Nomor Resep" value={form.nomor_resep} onChange={(e) => setForm({ ...form, nomor_resep: e.target.value })} />
            <TextField label="Nama Pasien" value={form.nama_pasien} onChange={(e) => setForm({ ...form, nama_pasien: e.target.value })} />
            <TextField label="Dokter" value={form.dokter} onChange={(e) => setForm({ ...form, dokter: e.target.value })} />
            <TextField label="Asisten" value={form.nama_asisten} onChange={(e) => setForm({ ...form, nama_asisten: e.target.value })} />
            <TextField label="Jasa" type="number" value={form.jasa} onChange={(e) => setForm({ ...form, jasa: +e.target.value })} />
            <TextField label="Obat" type="number" value={form.obat} onChange={(e) => setForm({ ...form, obat: +e.target.value })} />
            <TextField label="Lain-lain" type="number" value={form.lain_lain} onChange={(e) => setForm({ ...form, lain_lain: +e.target.value })} />
            <TextField label="Tindakan" type="number" value={form.tindakan} onChange={(e) => setForm({ ...form, tindakan: +e.target.value })} />
            <TextField label="Lab" type="number" value={form.lab} onChange={(e) => setForm({ ...form, lab: +e.target.value })} />
            <TextField label="Nebu" type="number" value={form.nebu} onChange={(e) => setForm({ ...form, nebu: +e.target.value })} />
            <TextField label="Total" type="number" value={form.total} onChange={(e) => setForm({ ...form, total: +e.target.value })} />
            <Button variant="contained" onClick={handleSubmit}>
              {form.id ? "Update" : "Simpan"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
