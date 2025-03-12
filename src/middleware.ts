import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;

  // cek sesi
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // manggil api untuk validasi
  const sessionRes = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
    headers: { Cookie: `session_token=${sessionToken}` },
  });

  // jika sesion tidak valid maka redirek ke login
  if (!sessionRes.ok) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  //
  return NextResponse.next();
}

// middleware untuk akses ketika user ingin masuk ke web
export const config = {
  matcher: ["/"],
};
