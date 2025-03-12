'use client'

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData,
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
    const theme = useTheme();
    return (
        // preview-start
        <AppProvider theme={theme}>
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
