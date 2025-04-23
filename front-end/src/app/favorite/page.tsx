'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import ProductCard from "@/components/ProductCard";

export default function FavoritePage() {
    const router = useRouter();

    const favoriteProducts = [
        {
            image: "/iphone.png",
            price: "9,499 juta",
            storeName: "Cellular World Official Store",
            productLink: "https://example.com/product1",
        },
        {
            image: "/iphone.png",
            price: "9,499 juta",
            storeName: "Cellular World Official Store",
            productLink: "https://example.com/product1",
        },


    ];

    const [screenWidth, setScreenWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function getJustifyClass() {
        const count = favoriteProducts.length;

        if (screenWidth < 544) {
            return count >= 2 ? 'justify-center' : 'justify-start';
        } else if (screenWidth < 928) { //768
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
                    <button onClick={() => router.back()} className="text-orange-500 hover:scale-110 transition">
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
                            image={product.image}
                            price={product.price}
                            storeName={product.storeName}
                            productLink={product.productLink}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
