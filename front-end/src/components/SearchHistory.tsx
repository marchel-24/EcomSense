import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface SearchHistoryProps {
  setIsFocused: (val: boolean) => void;
  setInputValue: (val: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ setIsFocused, setInputValue }) => {
  const [history, setHistory] = useState([
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ]);

  const removeHistoryItem = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
    setIsFocused(true); // Supaya pop-up tetap terbuka
  };

  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 w-[90%] max-w-[940px] bg-[#ADCDB9] rounded-2xl px-4 py-3 shadow-md"
      onMouseDown={(e) => e.stopPropagation()} // Mencegah pop-up tertutup saat klik dalam pop-up
    >
      <div
        className={`flex flex-col space-y-2 overflow-y-auto transition-all duration-300 ${
          history.length > 3 ? "max-h-[160px]" : "max-h-full"
        }`}
      >
        {history.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-2 border-b border-gray-400 last:border-none hover:bg-[#8DBA9E] transition-all duration-200"
          >
            {/* Nama Produk (Diklik, lalu masuk ke input & pop-up hilang) */}
            <span
              className="text-[#007F33] font-semibold cursor-pointer"
              onClick={() => {
                setInputValue(item);
                setIsFocused(false); // Pop-up hilang
              }}
            >
              {item}
            </span>
            {/* Tombol FaTimes (Menghapus produk, tapi pop-up tetap) */}
            <button
              onMouseDown={(e) => e.preventDefault()} // Mencegah trigger onBlur
              onClick={() => removeHistoryItem(index)}
            >
              <FaTimes className="text-green-700 hover:text-red-500 transition-all duration-200" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
