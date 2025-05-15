from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_tokopedia, ambil_ulasan_dari_link
from sentiment import analisis_ulasan
# import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti dengan ['http://localhost:3000'] untuk keamanan
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/chatbot")
def chatbot(q: str = Query(...)):
    produk_list = scrape_tokopedia(q)

    if not produk_list:
        return {
            "Kesimpulan": "NO DATA",
            "Produk": [],
            "Rata-rata Rating": 0,
            "Ulasan": []
        }

    all_reviews = []
    # Looping ambil ulasan dari semua produk
    for produk in produk_list:
        ulasan = ambil_ulasan_dari_link(produk['Link'], produk['Nama Produk'])
        all_reviews.extend(ulasan)

    # Jika tidak ada ulasan sama sekali
    if not all_reviews:
        return {
            "Kesimpulan": "NO DATA",
            "Produk": produk_list,
            "Rata-rata Rating": 0,
            "Ulasan": []
        }

    # Mapping data ulasan sesuai format output
    ulasan_output = [
        {"Username": u["Username"], "Ulasan": u["Ulasan"]}
        for u in all_reviews
    ]

    # Analisis ulasan untuk rata-rata rating dan kesimpulan
    avg_rating, verdict = analisis_ulasan(all_reviews, silent=True)

    response = {
        "Kesimpulan": verdict,
        "Produk": produk_list,
        "Rata-rata Rating": round(avg_rating, 2),
        "Ulasan": ulasan_output[:20],  # ambil max 20 ulasan seperti contoh
    }

    return response