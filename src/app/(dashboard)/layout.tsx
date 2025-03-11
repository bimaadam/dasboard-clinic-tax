"use client"

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import {
    DashboardLayout,
    ThemeSwitcher,
    type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { AttachMoney, MedicalServices, ViewWeek } from '@mui/icons-material';
import Dashboard from './page';
import LaporanHarian from './LaporanHarian/page';
import Box from '@mui/material/Box';
import PendapatanPage from './PendapatanKlinik/page';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Menu',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'LaporanHarian',
        title: 'Laporan Harian',
        icon: <ViewWeek />,
    },
    {
        segment: 'PendapatanKlinik',
        title: 'Pendapatan Klinik',
        icon: <AttachMoney />,
    },
    {
        kind: 'header',
        title: 'Pelaporan Pajak',
    },
    {
        segment: 'PajakPPh21',
        title: 'PPh 21 (Gaji Karyawan)',
        icon: <ReceiptIcon />,
    },
    {
        segment: 'PajakPPh23',
        title: 'PPh 23 (Jasa Dokter)',
        icon: <AccountBalanceIcon />,
    },
    {
        segment: 'PajakPPhBadan',
        title: 'PPh Badan',
        icon: <DescriptionIcon />,
    },
    {
        segment: 'PPN',
        title: 'PPN (Penjualan Obat)',
        icon: <AccountBalanceIcon />,
    },
    {
        segment: 'ReminderPajak',
        title: 'Reminder Pajak',
        icon: <AlarmOnIcon />,
    },
    {
        kind: 'header',
        title: 'Manajemen Klinik',
    },
    {
        segment: 'ManajemenKaryawan',
        title: 'Manajemen Karyawan',
        icon: <PeopleIcon />,
    },
    {
        segment: 'Pengaturan',
        title: 'Pengaturan',
        icon: <SettingsIcon />,
    }
];


const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
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

function KontenHalaman({ pathname }: { pathname: string }) {
    return (
        <Box
            sx={{
                py: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                textAlign: 'center',
            }}
        >
            {pathname === '/dashboard' && <Dashboard />}
            {pathname === '/LaporanHarian' && <LaporanHarian />}
            {pathname === '/PendapatanKlinik' && <PendapatanPage />}
        </Box>
    );
}


function ToolbarActionsSearch() {
    return (
        <Stack direction="row">
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <SearchIcon />
                            </IconButton>
                        ),
                        sx: { pr: 0.5 },
                    },
                }}
                sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
            />
            <ThemeSwitcher />
        </Stack>
    );
}

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love By Bima Adam`}
        </Typography>
    );
}

function KostumJudul() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <MedicalServices fontSize="medium" color="primary" />
            <h6 className="hidden md:block">Klinik Setia Medika</h6>
            <Chip size="small" label="Beta Release" color="info" />
            <Tooltip title="Connected to production">
                <CheckCircleIcon color="success" fontSize="small" />
            </Tooltip>
        </Stack>
    );
}

export default function DashboardLayoutSlots() {

    const router = useDemoRouter('/dashboard');

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout
                slots={{
                    appTitle: KostumJudul,
                    toolbarActions: ToolbarActionsSearch,
                    sidebarFooter: SidebarFooter,
                }}
            >
                <KontenHalaman pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}
