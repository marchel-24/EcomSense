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


import { NextRequest, NextResponse } from 'next/server';
import { queue } from '@/lib/queueStore'; // pastikan path sesuai

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   const query = searchParams.get("q");

//   // === Polling status ===
//   if (id) {
//     if (!queue[id]) {
//       return NextResponse.json({ status: "not_found" }, { status: 404 });
//     }
//     return NextResponse.json(queue[id]);
//   }

//   // === Submit scraping request ===
//   if (query) {
//     const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//     queue[requestId] = { status: "processing" };

//     fetch(`http://20.246.142.181/chatbot?q=${encodeURIComponent(query)}`)
//       .then((res) => res.json())
//       .then((data) => {
//         queue[requestId] = { status: "done", result: data };
//         console.log(`✅ Done: ${requestId}`);
//       })
//       .catch((err) => {
//         queue[requestId] = { status: "error", result: { message: err.message } };
//         console.error(`❌ Error: ${requestId}`, err);
//       });

//     return NextResponse.json({ requestId });
//   }

//   // === Invalid request ===
//   return NextResponse.json({ error: "Missing query or id" }, { status: 400 });
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const query = searchParams.get("q");

  // === 1. POLLING STATUS ===
  if (id) {
    if (!queue[id]) {
      return NextResponse.json({ status: "not_found" }, { status: 404 });
    }
    return NextResponse.json(queue[id]);
  }

  // === 2. SUBMIT SCRAPING REQUEST ===
  if (query) {
    const requestId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    queue[requestId] = { status: "processing" };

    // Jalankan scraping secara async tanpa blocking respons
    (async () => {
      try {
        const res = await fetch(`http://20.246.142.181/chatbot?q=${encodeURIComponent(query)}`);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Upstream error: ${text}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Invalid response: ${text}`);
        }

        const data = await res.json();
        queue[requestId] = { status: "done", result: data };
        console.log(`✅ Scraping success: ${requestId}`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        queue[requestId] = { status: "error", result: { message } };
        console.error(`❌ Scraping failed: ${requestId}`, message);
      }
    })();

    return NextResponse.json({ requestId });
  }

  // === 3. TIDAK ADA PARAMETER ===
  return NextResponse.json({ error: 'Missing query or id' }, { status: 400 });
}