import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Laporan Pajak",
  description: "Laporan Pajak admin dashboard by Bima Adam rin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

// import { NextAppProvider } from '@toolpad/core/nextjs';
// import LinearProgress from '@mui/material/LinearProgress';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AppRouterCacheProvider options={{ enableCssLayer: true }}>
//       <React.Suspense fallback={<LinearProgress />}>
//         <NextAppProvider navigation={NAVIGATION} branding={BRANDING}>
//           {children}
//         </NextAppProvider>
//       </React.Suspense>
//     </AppRouterCacheProvider>
//   );
// }
