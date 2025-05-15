from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv("KEY")
endpoint = os.getenv("ENDPOINT")

credential = AzureKeyCredential(key)
client = TextAnalyticsClient(endpoint=endpoint, credential=credential)

def analisis_ulasan(ulasan_list, silent=False):
    max_batch_size = 10
    all_responses = []
    total_score = 0

    # print("\n=== HASIL ANALISIS ULASAN ===")
    
    texts = [u['Ulasan'] for u in ulasan_list]

    for i in range(0, len(texts), max_batch_size):
        batch = texts[i:i + max_batch_size]
        try:
            response = client.analyze_sentiment(documents=batch)
            all_responses.extend(response)
        except Exception as e:
            if not silent:
                print(f"Terjadi kesalahan saat memproses batch {i//max_batch_size + 1}: {e}")
            continue

    for i, doc in enumerate(all_responses):
        if doc.is_error:
            # print(f"\nUlasan {i+1} oleh {ulasan_list[i]['Username']}: {texts[i]} (Error: {doc.error})")
            continue

        pos = doc.confidence_scores.positive
        neu = doc.confidence_scores.neutral
        neg = doc.confidence_scores.negative
        rating = (pos * 10) + (neu * 5) + (neg * 1)
        total_score += rating

        # print(f"\nUlasan {i+1} oleh {ulasan_list[i]['Username']}:")
        # print(f"{texts[i]}")
        # print(f" - Sentimen: {doc.sentiment}")
        # print(f" - Skor Positif: {pos:.2f}, Netral: {neu:.2f}, Negatif: {neg:.2f}")
        # print(f" - Rating Ulasan (1-10): {rating:.2f}")

    if all_responses:
        avg_rating = total_score / len(all_responses)
        # print(f"\nRata-rata Rating Produk: {avg_rating:.2f} dari 10")

        if avg_rating >= 7:
            verdict = "YES – Worth to Buy 👍"
        elif avg_rating >= 5:
            verdict = "MAYBE – Pertimbangkan dulu 🤔"
        else:
            verdict = "NO – Not Recommended 👎"

        # print(f"Kesimpulan: {verdict}")
        return avg_rating, verdict
    else:
        # print("\nTidak ada ulasan yang berhasil dianalisis.")
        return 0, "NO DATA"