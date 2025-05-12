import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://20.246.142.181/chatbot?q=${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      const text = await res.text(); // ← lihat isi pesan error dari server asli
      console.error("🔥 Error response from backend:", text);
      return NextResponse.json({ error: "Upstream API Error", detail: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("🔥 Proxy API fetch error:", error.message);
    return NextResponse.json({ error: "Failed to fetch from source API", detail: error.message }, { status: 500 });
  }
}

