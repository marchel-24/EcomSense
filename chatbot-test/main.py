from scraper import scrape_tokopedia, ambil_ulasan_dari_link
from sentiment import analisis_ulasan

def chatbot():
    print("=== Selamat datang di EcomSense ===\n")
    
    while True:
        query = input("Masukkan nama produk (atau ketik 'exit' untuk keluar): ").strip()
        if query.lower() == 'exit':
            print("Sampai jumpa!")
            break

        print("\nMencari produk dan ulasan... Mohon tunggu...\n")
        produk_list = scrape_tokopedia(query)

        all_reviews = []
        for item in produk_list:
            ulasan = ambil_ulasan_dari_link(item['Link'], item['Nama Produk'])
            all_reviews.extend([u['Ulasan'] for u in ulasan])

        if not all_reviews:
            print("Tidak ditemukan ulasan. Coba produk lain.\n")
            continue
        
        print("\n=== PRODUK YANG DITEMUKAN ===")
        for i, item in enumerate(produk_list, start=1):
            print(f"\nProduk {i}")
            print(f" - Nama : {item['Nama Produk']}")
            print(f" - Harga: {item['Harga']}")
            print(f" - Toko : {item['Toko']}")
            print(f" - Gambar: {item['Gambar']}")
            print(f" - Link  : {item['Link']}")

        print(f"\n{len(all_reviews)} ulasan ditemukan. Menganalisis sentimen...\n")
        analisis_ulasan(all_reviews)
        print("\n--- Selesai ---\n")

if __name__ == "__main__":
    chatbot()
