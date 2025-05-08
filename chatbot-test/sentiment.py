from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

key = "665JHIgPORAJLkEwRyuk2ayMq1PmHCMD8I8XEPAHy8k1r3notLG4JQQJ99BEACYeBjFXJ3w3AAAaACOG6Uxh"
endpoint = "https://ecomsense-sentiment.cognitiveservices.azure.com/"

credential = AzureKeyCredential(key)
client = TextAnalyticsClient(endpoint=endpoint, credential=credential)

def analisis_ulasan(ulasan_list):
    max_batch_size = 10
    all_responses = []
    total_score = 0

    print("\n=== HASIL ANALISIS ULASAN ===")
    
    for i in range(0, len(ulasan_list), max_batch_size):
        batch = ulasan_list[i:i + max_batch_size]
        try:
            response = client.analyze_sentiment(documents=batch)
            all_responses.extend(response)
        except Exception as e:
            print(f"Terjadi kesalahan saat memproses batch {i//max_batch_size + 1}: {e}")
            continue

    for i, doc in enumerate(all_responses):
        if doc.is_error:
            print(f"\nUlasan {i+1}: {ulasan_list[i]} (Error: {doc.error})")
            continue

        pos = doc.confidence_scores.positive
        neu = doc.confidence_scores.neutral
        neg = doc.confidence_scores.negative
        rating = (pos * 10) + (neu * 5) + (neg * 1)
        total_score += rating

        print(f"Ulasan {i+1}: {ulasan_list[i]}")
        # print(f" - Sentimen: {doc.sentiment}")
        # print(f" - Skor Positif: {pos:.2f}, Netral: {neu:.2f}, Negatif: {neg:.2f}")
        # print(f" - Rating Ulasan (1-10): {rating:.2f}")

    if all_responses:
        avg_rating = total_score / len(all_responses)
        print(f"\nRata-rata Rating Produk: {avg_rating:.2f} dari 10")

        if avg_rating >= 7:
            verdict = "YES – Worth to Buy 👍"
        elif avg_rating >= 5:
            verdict = "MAYBE – Pertimbangkan dulu 🤔"
        else:
            verdict = "NO – Not Recommended 👎"

        print(f"Kesimpulan: {verdict}")
        return avg_rating, verdict
    else:
        print("\nTidak ada ulasan yang berhasil dianalisis.")
        return 0, "NO DATA"