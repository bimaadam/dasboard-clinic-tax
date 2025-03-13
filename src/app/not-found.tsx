"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Container, createTheme } from "@mui/material";
import Image from "next/image";
import { AppProvider } from "@toolpad/core/AppProvider";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // Redirect ke home setelah 5 detik
    return () => clearTimeout(timer);
  }, [router]);

  const tema = createTheme({
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

  return (
    <AppProvider>
      <Container theme={tema} maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          textAlign="center"
        >
          <Image src="/404.svg" alt="404 Not Found" width={300} height={300} />
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Oops! Halaman Tidak Ditemukan
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Mohon Maaf Halaman Yang Anda Cari Tidak Ada
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => router.push("/")}
          >
            Kembali ke Dashboard
          </Button>
        </Box>
      </Container>
    </AppProvider>
  );
}
