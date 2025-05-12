import { FaArrowRight } from "react-icons/fa";
import { FC } from "react";

interface SearchInputLongProps {
  setIsFocused: (val: boolean) => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  onEnter?: () => void; // 👈 tambahkan ini
}

const SearchInputLong: FC<SearchInputLongProps> = ({ setIsFocused, inputValue, setInputValue, onEnter }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1080px] w-full min-h-[50px] bg-[#007F33] rounded-full flex items-center px-4 relative">
        {/* Input */}
        <input
          type="text"
          placeholder="Search..."
          value={inputValue ?? ""}
          onChange={(e) => setInputValue(e.target.value)}
          className={`pl-[10px] pr-[50px] min-h-[40px] bg-transparent outline-none w-full 
            placeholder-[#ADCDB9] transition-all duration-300 ease-in-out 
            ${inputValue ? "font-mono text-white text-xl" : "font-sans text-[#ADCDB9] text-lg"} font-bold`}          
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onEnter) {
              onEnter(); // 👈 panggil saat tekan Enter
            }
          }}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Tambahkan delay untuk memberi waktu klik
        />

        {/* Tombol */}
        <button className="w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center absolute right-[15px] transition-all duration-300 
          hover:bg-[#E6E6E6]">
          <FaArrowRight className="text-orange-500 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default SearchInputLong;
