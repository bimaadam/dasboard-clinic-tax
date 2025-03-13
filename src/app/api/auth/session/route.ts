import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const sessionToken = (await cookies()).get("session_token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true }, // Pastikan nge-fetch user
  });

  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  return NextResponse.json({
    nama: session.user.nama, // Pastikan ini ada
  });
}
