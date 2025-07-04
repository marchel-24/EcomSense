'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInputLong from '@/components/SearchInputLong';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import BubbleText from '@/components/BubbleText';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import ScoreAndTitle from '@/components/ScoreAndTitle';
import { PiSmileySadLight } from 'react-icons/pi';

interface Produk {
  Gambar: string;
  Harga: string;
  Link: string;
  "Nama Produk": string;
  Toko: string;
}

interface Ulasan {
  Ulasan: string;
  Username: string;
}

interface ChatbotResponse {
  Kesimpulan: string;
  Produk: Produk[];
  "Rata-rata Rating": number;
  Ulasan: Ulasan[];
}

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col w-full max-w-[1080px] items-center justify-center gap-2 mt-2 mb-1 text-[#007F33] border border-[#007F33] rounded-md p-4">
    <PiSmileySadLight size={48} />
    <p className="font-semibold text-center max-w-xs">{message}</p>
  </div>
);

export default function ChatClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();

  const [conversations, setConversations] = useState<
    { query: string; response: ChatbotResponse | null; isLoading: boolean }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [chatbotResponse, setChatbotResponse] = useState<ChatbotResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);
  const seenQueries = useRef<Set<string>>(new Set());

  const fetchChatbotData = async (newQuery: string, force = false) => {
    if (!newQuery) return;

    if (!force && seenQueries.current.has(newQuery)) return;
    if (!seenQueries.current.has(newQuery)) seenQueries.current.add(newQuery);

    // Tambahkan entri awal loading
    setConversations((prev) => [
      ...prev,
      { query: newQuery, response: null, isLoading: true },
    ]);

    try {
      // STEP 1: Submit permintaan ke API
      const submitRes = await fetch(`/api/chatbot?q=${encodeURIComponent(newQuery)}`);
      const { requestId } = await submitRes.json();

      // STEP 2: Polling status setiap 3 detik
      let result = null;
      for (let i = 0; i < 30; i++) { // 30x3 = 90 detik maksimal polling
        await new Promise((resolve) => setTimeout(resolve, 3000)); // tunggu 3 detik
        const statusRes = await fetch(`/api/chatbot?id=${requestId}`);
        const statusData = await statusRes.json();

        if (statusData.status === 'done') {
          result = statusData.result;
          break;
        }

        if (statusData.status === 'error') {
          throw new Error(statusData.result?.message || 'Scraping failed');
        }
      }

      // STEP 3: Update conversation
      if (result) {
        setConversations((prev) =>
          prev.map((item) =>
            item.query === newQuery && item.response === null
              ? { ...item, response: result, isLoading: false }
              : item
          )
        );
      } else {
        throw new Error('Timeout: scraping took too long');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setConversations((prev) =>
        prev.map((item) =>
          item.query === newQuery && item.response === null
            ? {
                ...item,
                isLoading: false,
                response: {
                  Produk: [],
                  Ulasan: [],
                  Kesimpulan: 'Terjadi kesalahan saat mengambil data.',
                  "Rata-rata Rating": 0,
                },
              }
            : item
        )
      );
    }
  };


  useEffect(() => {
    if (query) {
      fetchChatbotData(query);
      router.replace('/chat');
    }
  }, [query]);

  return (
    <main className="flex flex-col h-screen bg-[#F7F0EA]">
      <div className="fixed top-5 left-0 w-full z-10 bg-transparent flex justify-center">
        <Header hideLogo={false} />
      </div>

      <div className="flex-1 mt-[80px] mb-[90px] overflow-y-auto px-8">
        <div className="flex flex-col items-center gap-4">
          {conversations.map((conv, idx) => (
            <div key={idx} className="w-full flex flex-col items-center gap-4 mt-5">
              <BubbleText text={conv.query} />

              {conv.isLoading && (
                <p className="text-sm text-[#007F33] font-bold animate-pulse mb-5">Loading...</p>
              )}

              {!conv.isLoading && conv.response && (
                <>
                  {conv.response.Produk.length === 0 && (
                    <ErrorMessage message="Data not found or server error, please try another product or try again later." />
                  )}

                  {conv.response.Produk.length > 0 && conv.response.Ulasan.length === 0 && (
                    <>
                      <ErrorMessage message="No reviews found for this product." />
                      <SectionTitle
                        title="Where To Buy?"
                        description="Here are the best places to buy from trusted stores. Tap to see more!"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        {conv.response.Produk.map((product, index) => (
                          <ProductCard
                            key={index}
                            image={product.Gambar}
                            price={product.Harga}
                            storeName={product.Toko}
                            productLink={product.Link}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {conv.response.Produk.length > 0 && conv.response.Ulasan.length > 0 && (
                    <>
                      <ScoreAndTitle
                        title={conv.response.Kesimpulan}
                        description="Here's the summary based on user reviews"
                        score={`${conv.response['Rata-rata Rating'].toFixed(1)}/10`}
                      />

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-[880px]">
                        {conv.response.Ulasan.slice(0, 4).map((item, index) => (
                          <ReviewCard key={index} username={item.Username} review={item.Ulasan} />
                        ))}
                      </div>

                      <SectionTitle
                        title="Where To Buy?"
                        description="Here are the best places to buy from trusted stores. Tap to see more!"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        {conv.response.Produk.map((product, index) => (
                          <ProductCard
                            key={index}
                            image={product.Gambar}
                            price={product.Harga}
                            storeName={product.Toko}
                            productLink={product.Link}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-10 w-full z-[15] bg-transparent flex justify-center px-4 md:px-8 lg:px-1">
        <SearchInputLong
          setIsFocused={setIsFocused}
          onSubmit={(newQuery: string) => {
            if (newQuery.trim()) {
              router.push(`/chat?q=${encodeURIComponent(newQuery)}`);
              fetchChatbotData(newQuery, true);
              setInputValue(newQuery);
            }
          }}
        />
      </div>

      <footer className="fixed bottom-3 w-full text-xs text-[#a3a3a3] text-center">
        <p>Shop smarter, buy better with EcomSense!</p>
      </footer>
    </main>
  );
}
