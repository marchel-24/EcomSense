"use client"

import { FC, useState } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

interface ProductCardProps {
  image: string;
  price: string;
  storeName: string;
  productLink: string;
}

const ProductCard: FC<ProductCardProps> = ({ image, price, storeName, productLink }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
        <p className="text-sm md:text-base font-bold text-gray-900">Rp. {price}</p>
        <p className="text-xs md:text-sm text-gray-500 truncate">By {storeName}</p>

        {/* See More */}
        <a 
          href={productLink} 
          className="text-xs md:text-sm text-orange-500 underline font-medium mt-2 block text-right hover:text-orange-700"
        >
          See More
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
