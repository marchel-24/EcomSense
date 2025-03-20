"use client";

import { useState } from "react";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";
import SearchHistory from "@/components/SearchHistory";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State untuk input

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F0EA] text-[#a3a3a3] text-center px-6 ">
      <div className="fixed top-5 left-0 w-full z-10 bg-transparent flex justify-center">
        <Header hideLogo={true} />
      </div>

      {/* Logo */}
      <Image
        src="/EcomSense.png"
        alt="EcomSense Logo"
        width={550}
        height={550}
        className="mb-3 w-[70%] max-w-[550px] min-w-[350px] transition-all duration-300"
      />

      {/* Deskripsi */}
      <p className="max-w-[900px] text-[11px]/4 md:text-[13px]/4.5 lg:text-[15px]]/5.5 font-bold tracking-wide transition-all duration-300 mb-6 px-1 sm:px-8 md:px-12">
        Finding the best product has never been easier! EcomSense helps you determine whether a product is worth buying, where to purchase it, and discover alternative options. Powered by advanced AI, our chatbot provides real-time insights, price comparisons, and user reviews to ensure you make the best shopping decisions effortlessly. Start your smarter shopping journey today!
      </p>

      {/* Komponen Search */}
      <div className="relative w-[90%] max-w-[940px] flex justify-center">
        <SearchInput setIsFocused={setIsFocused} inputValue={inputValue} setInputValue={setInputValue} />

        {/* Search History */}
        {isFocused && (
          <div className="absolute justify-center top-full mt-2 w-full max-w-[940px] z-20">
            <SearchHistory setIsFocused={setIsFocused} setInputValue={setInputValue} />
          </div>
        )}
      </div>

      <footer className="fixed bottom-3 text-xs text-[#a3a3a3]">
        <p>Shop smarter, buy better with EcomSense!</p>
      </footer>
    </div>
  );
}
