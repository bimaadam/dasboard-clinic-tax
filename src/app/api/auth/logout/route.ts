import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const token = (await cookies()).get("session_token")?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { token } });
    (await cookies()).delete("session_token");
  }

  return NextResponse.json({ message: "Logged out" });
}
