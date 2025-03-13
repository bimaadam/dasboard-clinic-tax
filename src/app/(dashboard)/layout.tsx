"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import {
  AccountBalanceWallet,
  AttachMoney,
  Description,
  MedicalServices,
  Receipt,
  ReceiptLong,
  ReceiptOutlined,
  Settings,
  ViewWeek,
} from "@mui/icons-material";
import Dashboard from "./page";
import BarChartIcon from "@mui/icons-material/BarChart";
import LaporanHarian from "./(laporan)/laporan-harian/page";
import Box from "@mui/material/Box";
import PendapatanPage from "./(laporan)/pendapatan/page";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { PageHeader } from "@toolpad/core/PageContainer";
import Laporan from "./(laporan)/layout";
import Penggajian from "./(laporan)/penggajian/page";
import PPH21Page from "./(laporanpajak)/pph21/page";
import PPH23Page from "./(laporanpajak)/pph23/page";
import PPNPage from "./(laporanpajak)/ppn/page";
import LaporanPajakLayout from "./(laporanpajak)/layout";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Menu Pajak & Keuangan",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "header",
    title: "Laporan Keuangan",
  },
  {
    segment: "laporan",
    title: "Laporan",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "laporan-harian",
        title: "Laporan Harian",
        icon: <ViewWeek />,
      },
      {
        segment: "pendapatan",
        title: "Pendapatan",
        icon: <AttachMoney />,
      },
      {
        segment: "penggajian",
        title: "Gaji Pegawai & Jasa",
        icon: <AccountBalanceWallet />,
      },
    ],
  },
  {
    kind: "header",
    title: "Laporan Pajak",
  },
  {
    segment: "laporan-pajak",
    title: "Laporan Pajak",
    icon: <Receipt />,
    children: [
      {
        segment: "pph21",
        title: "PPh 21",
        icon: <ReceiptLong />,
      },
      {
        segment: "pph23",
        title: "PPh 23",
        icon: <Description />,
      },
      {
        segment: "ppn",
        title: "PPN",
        icon: <ReceiptOutlined />,
      },
    ],
  },
  {
    segment: "pengaturan",
    title: "Pengaturan Pajak",
    icon: <Settings />,
  },
];

const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        textAlign: "center",
      }}
    >
      {pathname === "/dashboard" && <Dashboard />}
      {pathname === "/laporan" && <Laporan />}
      {pathname === "/laporan/laporan-harian" && <LaporanHarian />}
      {pathname === "/laporan/pendapatan" && <PendapatanPage />}
      {pathname === "/laporan/penggajian" && <Penggajian />}
      {pathname === "/laporan-pajak" && <LaporanPajakLayout />}
      {pathname === "/laporan-pajak/pph21" && <PPH21Page />}
      {pathname === "/laporan-pajak/pph23" && <PPH23Page />}
      {pathname === "/laporan-pajak/ppn" && <PPNPage />}
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
              display: { xs: "inline", md: "none" },
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
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}

interface SidebarFooterProps {
  mini: boolean;
}

function SidebarFooter({ mini }: SidebarFooterProps) {
  const [session, setSession] = useState<{ nama: string } | null>(null);

  useEffect(() => {
    async function getSession() {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      }
    }
    getSession();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
    window.location.href = "/auth/login"; // Redirect ke halaman login
  };

  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
      }}
    >
      {session ? (
        <>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 500, mb: 1 }}
          >
            Login Sebagai:{" "}
            <strong style={{ color: "#1976d2" }}>{session.nama}</strong>
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              mt: 1,
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
              py: 0.5,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#d32f2f",
                transform: "scale(1.05)",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Not Logged In
        </Typography>
      )}
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          display: "block",
          fontStyle: "italic",
          color: "#555",
        }}
      >
        {mini
          ? "© Bima"
          : `© ${new Date().getFullYear()} Made with love by Bima Adam`}
      </Typography>
    </Box>
  );
}

function KostumJudul() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <MedicalServices fontSize="medium" color="primary" />
      <h6 className="hidden md:block">Klinik Setia Medika</h6>
      <Chip size="small" label="Development" color="info" />
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

export default function DashboardLayoutSlots() {
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={Theme}>
      <DashboardLayout
        slots={{
          appTitle: KostumJudul,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >
        <div className="p-5">
          <PageHeader />
        </div>
        <KontenHalaman pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
