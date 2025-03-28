import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

export interface LaporanHarian {
  id: number;
  tanggal: string;
  nomor_resep: string;
  nama_pasien: string;
  dokter: string;
  nama_asisten: string;
  jasa: number;
  obat: number;
  lain_lain: number;
  tindakan: number;
  lab: number;
  nebu: number;
  total: number;
}

export default function CrudLaporanHarian() {
  const [laporan, setLaporan] = React.useState<LaporanHarian[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nomorResep: '',
    namaPasien: '',
    dokter: '',
    namaAsisten: '',
    jasa: '',
    obat: '',
    lainLain: '',
    tindakan: '',
    lab: '',
    nebu: '',
    total: 0,
  });

  const today = new Date().toISOString().split('T')[0];

  React.useEffect(() => {
    async function fetchLaporan() {
      try {
        const res = await fetch('/api/laporan-harian');
        if (!res.ok) throw new Error(`Gagal fetch laporan: ${res.statusText}`);
        const data = await res.json();
        setLaporan(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLaporan();
  }, []);

  const handleTambahClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newValue = name.match(/jasa|obat|lainLain|tindakan|lab|nebu/) ? Number(value) || 0 : value;
      const newTotal =
        (name.match(/jasa|obat|lainLain|tindakan|lab|nebu/) ? { ...prev, [name]: newValue } : prev);
      return {
        ...prev,
        [name]: newValue,
        total:
          newTotal.jasa + newTotal.obat + newTotal.lainLain + newTotal.tindakan + newTotal.lab + newTotal.nebu,
      };
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const newLaporan = {
        tanggal: today,
        nomor_resep: formData.nomorResep,
        nama_pasien: formData.namaPasien,
        dokter: formData.dokter,
        nama_asisten: formData.namaAsisten,
        jasa: formData.jasa,
        obat: formData.obat,
        lain_lain: formData.lainLain,
        tindakan: formData.tindakan,
        lab: formData.lab,
        nebu: formData.nebu,
        total: formData.total,
      };

      const res = await fetch('/api/laporan-harian', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLaporan),
      });

      if (!res.ok) throw new Error(`Gagal tambah laporan: ${res.statusText}`);

      const savedLaporan = await res.json();
      setLaporan((prev) => [...prev, savedLaporan]);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'tanggal', headerName: 'Tanggal', width: 120 },
    { field: 'nomor_resep', headerName: 'Nomor Resep', width: 150 },
    { field: 'nama_pasien', headerName: 'Nama Pasien', width: 150 },
    { field: 'dokter', headerName: 'Dokter', width: 150 },
    { field: 'nama_asisten', headerName: 'Nama Asisten', width: 150 },
    { field: 'jasa', headerName: 'Jasa', width: 120 },
    { field: 'obat', headerName: 'Obat', width: 120 },
    { field: 'lain_lain', headerName: 'Lain-lain', width: 120 },
    { field: 'tindakan', headerName: 'Tindakan', width: 120 },
    { field: 'lab', headerName: 'Lab', width: 120 },
    { field: 'nebu', headerName: 'Nebu', width: 120 },
    { field: 'total', headerName: 'Total', width: 120 },
  ];

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleTambahClick}>
          Tambah Laporan
        </Button>
      </Box>

      <DataGrid rows={laporan} columns={columns} getRowId={(row) => row.id || row.nomor_resep} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tambah Laporan</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((key) => (
            key !== 'total' && (
              <TextField
                key={key}
                label={key.replace('_', ' ')}
                fullWidth
                margin="dense"
                type={key.match(/jasa|obat|lainLain|tindakan|lab|nebu/) ? 'number' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
              />
            )
          ))}
          <TextField label="Total" fullWidth margin="dense" type="number" value={formData.total} disabled />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}