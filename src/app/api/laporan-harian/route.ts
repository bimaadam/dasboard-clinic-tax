import { NextResponse } from "next/server";

// URL backend Golang
const API_URL = "http://localhost:8080/laporan";

// GET data dari Golang
export async function GET() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}

// POST data ke Golang
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error posting data" },
      { status: 500 }
    );
  }
}
