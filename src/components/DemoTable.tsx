import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Crud, DataModel, DataSource, DataSourceCache } from '@toolpad/core/Crud';
import { useDemoRouter } from '@toolpad/core/internal';

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export interface LaporanKlinik extends DataModel {
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

export const notesDataSource: DataSource<LaporanKlinik> = {
    fields: [
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
    ],
    getMany: async ({ paginationModel, filterModel, sortModel }) => {
        try {
            const res = await fetch('/api/laporan-harian');
            const notes = await res.json();

            let processedNotes = [...notes];

            if (filterModel?.items?.length) {
                filterModel.items.forEach(({ field, value, operator }) => {
                    if (!field || value == null) return;
                    processedNotes = processedNotes.filter((note) => {
                        const noteValue = note[field];
                        if (typeof noteValue === 'number' && typeof value === 'number') {
                            return operator === '>' ? noteValue > value : noteValue < value;
                        }
                        return String(noteValue).toLowerCase().includes(String(value).toLowerCase());
                    });
                });
            }

            if (sortModel?.length) {
                processedNotes.sort((a, b) => {
                    for (const { field, sort } of sortModel) {
                        const aValue = a[field];
                        const bValue = b[field];
                        if (aValue < bValue) return sort === 'asc' ? -1 : 1;
                        if (aValue > bValue) return sort === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            const start = paginationModel.page * paginationModel.pageSize;
            const end = start + paginationModel.pageSize;
            return { items: processedNotes.slice(start, end), itemCount: processedNotes.length };
        } catch (error) {
            console.error('Error fetching data:', error);
            return { items: [], itemCount: 0 };
        }
    },
    getOne: async (id) => {
        try {
            const res = await fetch(`/api/laporan-harian/${id}`);
            return await res.json();
        } catch (error) {
            throw new Error('Data not found');
        }
    },
    createOne: async (data) => {
        try {
            const res = await fetch('/api/laporan-harian', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return await res.json();
        } catch (error) {
            throw new Error('Error creating data');
        }
    },
    updateOne: async (id, data) => {
        try {
            const res = await fetch(`/api/laporan-harian/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return await res.json();
        } catch (error) {
            throw new Error('Error updating data');
        }
    },
    deleteOne: async (id) => {
        try {
            await fetch(`/api/laporan-harian/${id}`, { method: 'DELETE' });
        } catch (error) {
            throw new Error('Error deleting data');
        }
    },
};

const notesCache = new DataSourceCache();

export default function CrudLaporan() {
    const router = useDemoRouter('/laporan-harian');
    return (
        <AppProvider router={router} theme={demoTheme}>
            <Crud<LaporanKlinik>
                dataSource={notesDataSource}
                dataSourceCache={notesCache}
                rootPath="/laporan-harian"
                initialPageSize={10}
            />
        </AppProvider>
    );
}
