'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import ProductCard from "@/components/ProductCard";

interface FavoriteProduct {
  product_url: string;
  saved_at: string;
  product_image?: string;
  product_price?: string;
  store_name?: string;
  productName?: string;
}

export default function FavoritePage() {
  const router = useRouter();
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const userId = user.id;

    fetch(`http://localhost:5000/api/favorites?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((item: FavoriteProduct) => ({
          ...item,
          image: item.product_image,     
          price: item.product_price,     
          storeName: item.store_name,    
        }));
        setFavoriteProducts(enriched);
        console.log("DATA FAVORIT:", data);
      })
      .catch((err) => console.error("Gagal memuat data favorit:", err));
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getJustifyClass() {
    const count = favoriteProducts.length;

    if (screenWidth < 544) {
      return count >= 2 ? 'justify-center' : 'justify-start';
    } else if (screenWidth < 928) {
      return count >= 3 ? 'justify-center' : 'justify-start';
    } else if (screenWidth <= 1160) {
      return count >= 4 ? 'justify-center' : 'justify-start';
    } else {
      return count >= 5 ? 'justify-center' : 'justify-start';
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F0EA] pb-3 pt-1">
      {/* Back & Title */}
      <div className="mt-4 px-4 md:px-10 lg:px-12">
        <div className="w-full max-w-[1080px] mx-auto flex items-center gap-2">
          <button onClick={() => router.replace("/")} className="text-orange-500 hover:scale-110 transition">
            <HiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500">Favorite</h1>
        </div>

        {/* Garis pembatas */}
        <div className="w-full max-w-[1080px] mx-auto mt-3 border-b border-orange-300 drop-shadow-md"></div>
      </div>

      {/* Product Grid */}
      <div className="mt-6 px-4 md:px-10 lg:px-12">
        <div
          className={`max-w-[1080px] mx-auto grid gap-4 
          grid-cols-[repeat(auto-fit,160px)] 
          sm:grid-cols-[repeat(auto-fit,180px)]  
          md:grid-cols-[repeat(auto-fit,200px)]  
          ${getJustifyClass()}`}
        >
          {favoriteProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.product_image!}
              price={product.product_price!}
              storeName={product.store_name!}
              productLink={product.product_url}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
