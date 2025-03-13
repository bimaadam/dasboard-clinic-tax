"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
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

  if (!session) {
    return (
      <Typography variant="h6" color="initial">
        Loading...
      </Typography>
    );
  }

  return (
    <Typography variant="h6" color="initial">
      Selamat Datang{" "}
      <strong style={{ color: "blueviolet" }}>{session.nama} 👋</strong>
    </Typography>
  );
}
