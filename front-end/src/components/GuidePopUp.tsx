"use client";

import { FC } from "react";

interface GuidePopupProps {
  onClose: () => void;
}

const GuidePopup: FC<GuidePopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-[1000]">
      <div className="bg-white max-w-lg max-h-[70vh] w-full p-7 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-base transform transition-all duration-200 hover:scale-110 hover:text-[#F25500]"
        >
          ✕
        </button>

        {/* Wrapper Scrollable */}
        <div className="max-h-[60vh] overflow-y-auto px-4 py-2">
          {/* Judul */}
          <h2 className="text-orange-500 text-xl font-bold text-center mb-4">About Us</h2>
          <p className="text-[#a3a3a3] text-sm leading-relaxed" style={{ textAlign: "justify" }}>
            Welcome to <b>EcomSense</b>, your intelligent shopping assistant powered by AI! 
            Our mission is to help you make smarter purchasing decisions by providing real-time 
            insights, price comparisons, and user reviews. With EcomSense, you can easily determine 
            whether a product is worth buying, find the best place to purchase it, and discover 
            alternative options tailored to your needs.
          </p>

          {/* Judul Kedua */}
          <h2 className="text-orange-500 text-xl font-bold text-center mt-6 mb-4">How to Use</h2>
          <p className="text-[#a3a3a3] text-sm leading-relaxed" style={{ textAlign: "justify" }}>
            1. Type the name of the product in the search bar. <br />
            2. EcomSense will display key details, including:<br />
            - Sentiment analysis score from user feedback.<br />
            - Four user reviews summarizing experiences.<br />
            - Four recommended stores with prices and direct purchase links.<br />
            - Three alternative product recommendations with price ranges.<br />
            3. To bookmark a product, click the <b>star icon</b> below it. Access saved products in the <b>Favorite</b> section of your profile menu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidePopup;
