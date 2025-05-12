"use client"

import { useEffect, useState } from "react";
import SearchInputLong from "@/components/SearchInputLong";
import SearchHistoryLong from "@/components/SearchHistoryLong";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import BubbleText from "@/components/BubbleText";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import ScoreAndTitle from "@/components/ScoreAndTitle";

// 🔶 Interface untuk response API
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

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState<ChatbotResponse | null>(null);

  // useEffect(() => {
  //   if (!inputValue) return;

  //   const timeout = setTimeout(() => {
  //     const fetchData = async () => {
  //       try {
  //           const url = `http://localhost:8000/chatbot?q=${encodeURIComponent(inputValue)}`;
  //           console.log("🔍 Requesting API:", url);
  //         const res = await fetch(url);
  //         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  //         const data = await res.json();
  //         console.log("✅ Data received:", data);
  //         setChatbotResponse(data);
  //       } catch (err) {
  //         console.error("🚨 Gagal fetch API:", err);
  //       }
  //     };

  //     fetchData();
  //   }, 500); // debounce 500ms

  //   return () => clearTimeout(timeout);
  // }, [inputValue]);

  const handleSubmit = async () => {
    if (!inputValue) return;
  
    try {
      const url = `http://localhost:8000/chatbot?q=${encodeURIComponent(inputValue)}`;
      console.log("🔍 Requesting:", url);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      console.log("✅ Data received:", data);
      setChatbotResponse(data);
    } catch (err) {
      console.error("🚨 Gagal fetch:", err);
    }
  };
  

  return (
    <main className="flex justify-center items-center flex-col h-screen bg-[#F7F0EA] backdrop-blur-md">
      {/* Header */}
      <div className="fixed top-5 left-0 w-full z-10 bg-transparent flex justify-center">
        <Header hideLogo={false} />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 overflow-auto mt-[80px] mb-[80px] flex flex-col items-center w-full mx-auto p-8 pl-11 lg:pl-8 gap-4">
        <div className="w-full flex justify-center mb-6">
          <BubbleText text={inputValue || "-"} />
        </div>

        {chatbotResponse && (
          <ScoreAndTitle
            title={chatbotResponse.Kesimpulan}
            description="Here's the summary based on user reviews"
            score={`${chatbotResponse["Rata-rata Rating"].toFixed(1)}/10`}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-[880px]">
          {chatbotResponse?.Ulasan?.slice(0, 4).map((item, index) => (
            <ReviewCard key={index} username={item.Username} review={item.Ulasan} />
          ))}
        </div>

        <SectionTitle
          title="Where To Buy?"
          description="Here are the best places to buy from trusted stores. Tap to see more!"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {chatbotResponse?.Produk?.map((product, index) => (
            <ProductCard
              key={index}
              image={product.Gambar}
              price={product.Harga}
              storeName={product.Toko}
              productLink={product.Link}
            />
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        {/* {isFocused && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full z-[10] px-4 md:px-8 lg:px-1">
            <SearchHistoryLong setIsFocused={setIsFocused} setInputValue={setInputValue}
 />
          </div>
        )} */}

        <div className="fixed bottom-10 w-full z-[15] bg-transparent flex justify-center px-4 md:px-8 lg:px-1 lg:pr-[13px] backdrop-blur-lg">
          <SearchInputLong
            setIsFocused={setIsFocused}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onEnter={handleSubmit}
          />
        </div>
      </div>

      <footer className="fixed bottom-3 text-xs text-[#a3a3a3]">
        <p>Shop smarter, buy better with EcomSense!</p>
      </footer>
    </main>
  );
}
