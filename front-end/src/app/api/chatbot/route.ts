import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("q");

//   if (!query) {
//     return NextResponse.json({ error: "Missing query" }, { status: 400 });
//   }

//   try {
//     const res = await fetch(`http://20.246.142.181/chatbot?q=${encodeURIComponent(query)}`);
    
//     if (!res.ok) {
//       const text = await res.text(); // ← lihat isi pesan error dari server asli
//       console.error("🔥 Error response from backend:", text);
//       return NextResponse.json({ error: "Upstream API Error", detail: text }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error: any) {
//     console.error("🔥 Proxy API fetch error:", error.message);
//     return NextResponse.json({ error: "Failed to fetch from source API", detail: error.message }, { status: 500 });
//   }
// }

// Simpan request ID dan status sementara
const queue: Record<string, { status: string; result?: any }> = {}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Simpan status awal
  queue[requestId] = { status: "processing" };

  // Luncurkan scraping tanpa menunggu selesai
  fetch(`http://20.246.142.181/chatbot?q=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((data) => {
      queue[requestId] = { status: "done", result: data };
    })
    .catch((err) => {
      queue[requestId] = { status: "error", result: { message: err.message } };
    });

  // Langsung balas ID
  return NextResponse.json({ requestId });
}

// Endpoint baru untuk cek status
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || !queue[id]) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json(queue[id]);
}

