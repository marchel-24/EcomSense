import { FC } from "react";

interface ProductCardProps {
  image: string;
  price: string;
  storeName: string;
  productLink: string;
}

const ProductCard: FC<ProductCardProps> = ({ image, price, storeName, productLink }) => {
  return (
    <div className="w-[210px] h-[300px] bg-white rounded-xl shadow-md p-3 flex flex-col justify-between border border-gray-300">
      {/* Product Image */}
      <div className="w-[180px] h-[180px] mx-auto border border-gray-300 rounded-lg overflow-hidden">
        <img src={image} alt="Product" className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Product Info */}
      <div className="mt-1"> {/* Harga lebih dekat ke foto */}
        <p className="text-base font-bold text-gray-900">Rp. {price}</p>
        <p className="text-sm text-gray-500 truncate max-w-[210px]">By {storeName}</p>

        {/* See More */}
        <a 
          href={productLink} 
          className="text-sm text-orange-500 underline font-medium mt-4 text-right block"
        >
          See More
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
