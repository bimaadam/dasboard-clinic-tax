import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log("Email:", email);
  console.log("Password:", password);

  const user = await prisma.user.findUnique({ where: { email } });

  console.log("User dari DB:", user);

  if (!user || user.password !== password) {
    return NextResponse.json(
      { error: "Email atau password salah" },
      { status: 401 }
    );
  }

  const token = randomUUID();

  // **Hapus session lama sebelum buat yang baru**
  await prisma.session.deleteMany({
    where: { userId: user.id },
  });

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 hari
    },
  });

  (await cookies()).set("session_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 hari
  });

  return NextResponse.json({ message: "Login berhasil!", token });
}
