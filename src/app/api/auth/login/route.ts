import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log("Email:", email);
  console.log("Password:", password);

  const dokter = await prisma.dokter.findUnique({ where: { email } });

  console.log("Dokter dari DB:", dokter);

  if (!dokter || dokter.password !== password) {
    return NextResponse.json(
      { error: "Email atau password salah" },
      { status: 401 }
    );
  }

  const session = await prisma.session.create({
    data: {
      dokterId: dokter.id,
      token: randomUUID(),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  (await cookies()).set("session_token", session.token, {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ message: "Login berhasil!" });
}
