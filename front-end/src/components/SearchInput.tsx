import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import from next/navigation

interface SearchInputProps {
  setIsFocused: (val: boolean) => void;
  inputValue: string;
  setInputValue: (val: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ setIsFocused, inputValue, setInputValue }) => {
  const router = useRouter(); // Initialize useRouter

  const handleSearchClick = () => {
    if (inputValue.trim() !== "") {
      router.push(`/chat?q=${encodeURIComponent(inputValue)}`);
    }
  }; 


  return (
    <div 
      className="w-[90%] max-w-[940px] min-h-[45px] sm:min-h-[48px] md:min-h-[50px] bg-[#007F33] rounded-full flex items-center px-4 relative transition-all duration-300">
      {/* Input */}
      <input
        type="text"
        value={inputValue}
        placeholder="Search..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {if (e.key === "Enter") handleSearchClick();}}

        className="pl-[10px] pr-[50px] w-full bg-transparent outline-none text-[#ADCDB9] font-bold placeholder-[#ADCDB9] 
          text-sm sm:text-base md:text-lg min-h-[35px] sm:min-h-[40px] md:min-h-[45px] transition-all duration-300"
      />

      {/* Tombol */}
      <button 
        onClick={handleSearchClick} // Mengarahkan ke halaman /chat saat diklik
        className="w-[35px] sm:w-[38px] md:w-[40px] h-[35px] sm:h-[38px] md:h-[40px] bg-white rounded-full flex justify-center items-center absolute right-[10px] sm:right-[15px] transition-all duration-300 
          hover:bg-[#E6E6E6]" // Hover color change
      >
        <FaArrowRight className="text-orange-500 text-base sm:text-[17px] md:text-lg" />
      </button>
    </div>
  );
};

export default SearchInput;
