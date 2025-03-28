import { NextResponse } from "next/server";

// Ambil URL backend dari environment variable
const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL tidak ditemukan di environment variables");
}

// GET data dari Golang
export async function GET() {
  try {
    const res = await fetch(`${API_URL}/laporan`);
    if (!res.ok) {
      throw new Error(`Gagal fetch: ${res.statusText}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching data", error: errMessage },
      { status: 500 }
    );
  }
}

// POST data ke Golang
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_URL}/laporan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Gagal POST: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error posting data", error: errMessage },
      { status: 500 }
    );
  }
}
