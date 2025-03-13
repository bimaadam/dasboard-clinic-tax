"use client";

import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { createTheme, useTheme } from "@mui/material/styles";

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

const BRANDING = {
  logo: <img src="/logo.svg" alt="Logo" style={{ height: 120, width: 250 }} />,
  title: "Dashboard",
};
// preview-start
const providers = [{ id: "credentials", name: "Email and Password" }];
// preview-end

const signIn: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json(); // Baca response dari server

  if (res.ok) {
    console.log("Login sukses:", data);
    window.location.href = "/"; // Redirect ke dashboard
  } else {
    console.error("Login gagal:", data);
    alert(data.message || "Cek email dan password");
  }
};

export default function CredentialsSignInPage() {
  return (
    // preview-start
    <AppProvider branding={BRANDING} theme={Theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { method: "POST", noValidate: true }, // Paksa pakai POST
        }}
      />
    </AppProvider>
    // preview-end
  );
}
