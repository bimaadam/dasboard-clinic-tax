import * as React from 'react';
import Typography from '@mui/material/Typography';

const user = "Admin Klinik Setia Medika"

export default function Dashboard() {
  return (
    <Typography variant="h6" color="initial">Selamat Datang {user}</Typography>
  )
}
