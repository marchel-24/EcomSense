import pandas as pd
from textblob import TextBlob

# Membaca file CSV
file_path = "Tokopedia.csv"  # Ganti dengan lokasi folder jika perlu

df = pd.read_csv(file_path)

# Pastikan ada kolom yang sesuai untuk analisis, misalnya "review"
if "Ulasan" not in df.columns:
    raise ValueError("Kolom 'review' tidak ditemukan dalam dataset")

# Fungsi untuk analisis sentimen
def get_sentiment(text):
    analysis = TextBlob(str(text))  # Pastikan teks dalam bentuk string
    if analysis.sentiment.polarity > 0:
        return "Positif"
    elif analysis.sentiment.polarity == 0:
        return "Netral"
    else:
        return "Negatif"

# Terapkan analisis sentimen ke setiap ulasan
df["sentiment"] = df["Ulasan"].apply(get_sentiment)

# Simpan hasil ke file baru
df.to_csv("Sentimen_Tokopedia.csv", index=False)

print("Analisis sentimen selesai. File disimpan sebagai 'Sentimen_Tokopedia.csv'")
