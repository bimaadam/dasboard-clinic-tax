"use client";
import useUserSession from "@/hooks/usersession";
import Typography from "@mui/material/Typography";

export default function DashboardPage() {
  const session = useUserSession();

  if (!session) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Typography variant="h6">
      Selamat Datang{" "}
      <strong style={{ color: "blueviolet" }}>{session.nama} 👋</strong>
    </Typography>
  );
}
