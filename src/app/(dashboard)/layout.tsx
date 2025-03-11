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
import { AccountBalanceWallet, AttachMoney, Description, MedicalServices, Receipt, ReceiptLong, ReceiptOutlined, Settings, ViewWeek } from '@mui/icons-material';
import Dashboard from './page';
import BarChartIcon from '@mui/icons-material/BarChart';
import LaporanHarian from './LaporanHarian/page';
import Box from '@mui/material/Box';
import PendapatanPage from './PendapatanKlinik/page';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Menu Pajak & Keuangan',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        kind: 'header',
        title: 'Laporan Keuangan',
    },
    {
        segment: 'laporan',
        title: 'Laporan',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'laporan-harian',
                title: 'Laporan Harian',
                icon: <ViewWeek />,
            },
            {
                segment: 'pendapatan-klinik',
                title: 'Pendapatan Klinik',
                icon: <AttachMoney />,
            },
            {
                segment: 'penggajian',
                title: 'Gaji Pegawai & Jasa Dokter',
                icon: <AccountBalanceWallet />,
            }
        ],
    },
    {
        kind: 'header',
        title: 'Laporan Pajak',
    },
    {
        segment: 'laporan-pajak',
        title: 'Laporan Pajak',
        icon: <Receipt />,
        children: [
            {
                segment: 'pph21',
                title: 'PPh 21',
                icon: <ReceiptLong />,
            },
            {
                segment: 'pph23',
                title: 'PPh 23',
                icon: <Description />,
            },
            {
                segment: 'ppn',
                title: 'PPN',
                icon: <ReceiptOutlined />,
            }
        ],
    },
    {
        segment: 'pengaturan',
        title: 'Pengaturan Pajak',
        icon: <Settings />,
    }
];


const Theme = createTheme({
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
            theme={Theme}
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
