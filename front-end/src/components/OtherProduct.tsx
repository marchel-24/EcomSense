import { FC } from "react";

interface OtherProductProps {
  image: string;
  productName: string;
  price: string;
}

const OtherProduct: FC<OtherProductProps> = ({ image, productName, price }) => {
  return (
    <div className="w-full lg:w-[285px] h-[80px] bg-white rounded-xl shadow-md flex items-center px-3 border border-gray-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
      {/* Product Image */}
      <div className="w-[60px] h-[60px] border border-gray-300 rounded-lg overflow-hidden">
        <img src={image} alt={productName} className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Product Info */}
      <div className="ml-3">
        <p className="text-base font-bold text-gray-900">{productName}</p>
        <p className="text-sm text-gray-500">Rp. {price}</p>
      </div>
    </div>
  );
};

export default OtherProduct;
