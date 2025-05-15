"use client";

import { FC, useEffect, useState } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

interface ProductCardProps {
  image: string;
  price: string;
  storeName: string;
  productLink: string;
}

const ProductCard: FC<ProductCardProps> = ({ image, price, storeName, productLink}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const userId = user.id;

    console.log("Unfavoriting:", {
      user_id: userId,
      product_url: productLink
    });

    fetch(`https://ecom-sense-be.vercel.app/api/favorites?user_id=${userId}`)
      .then((res) => res.json())
      .then((favorites) => {
        const found = favorites.some(
          (item: { product_url: string }) => item.product_url === productLink
        );
        setIsFavorite(found);
      })
      .catch((err) => {
        console.error("Gagal mengecek favorit:", err);
      });
  }, [productLink]);

  const toggleFavorite = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    

    const user = JSON.parse(storedUser);
    const userId = user.id;

    console.log("Unfavoriting:", {
      user_id: userId,
      product_url: productLink
    });


    if (isFavorite) {
      try {
        const res = await fetch("https://ecom-sense-be.vercel.app/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            product_url: productLink,
          }),
        });

        if (res.ok) {
          setIsFavorite(false);
          console.log("Produk dihapus dari favorit.");
        } else {
          const errText = await res.text();
          console.error("Gagal menghapus favorit", errText);
        }
      } catch (err) {
        console.error("Error saat menghapus favorit:", err);
      }
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            product_url: productLink,
            product_price: price,
            product_image: image,
            store_name: storeName,
          }),
        });

        if (res.ok) {
          setIsFavorite(true);
          console.log("Produk ditambahkan ke favorit.");
        }
      } catch (err) {
        console.error("Error saat menyimpan favorit:", err);
      }
    }
  };

  

  return (
    <div className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] h-auto bg-white rounded-xl shadow-md p-2 flex flex-col justify-between border border-gray-300 mx-auto transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
      {/* Product Image with Favorite Icon */}
      <div className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] border border-gray-300 rounded-lg overflow-hidden">
        <img src={image} alt="Product" className="w-full h-full object-cover rounded-lg" />

        {/* Favorite Icon */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md transition-transform duration-200 hover:scale-110"
        >
          {isFavorite ? (
            <MdOutlineFavorite className="text-orange-500 w-5 h-5" />
          ) : (
            <MdOutlineFavoriteBorder className="text-orange-500 w-5 h-5" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-1">
        <p className="text-sm md:text-base font-bold text-gray-900">{price}</p>
        <p className="text-xs md:text-sm text-gray-500 truncate">By {storeName}</p>

        {/* See More */}
        <a
          href={productLink}
          className="text-xs md:text-sm text-orange-500 underline font-medium mt-2 block text-right hover:text-orange-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          See More
        </a>
      </div>
    </div>
  );
};

export default ProductCard;