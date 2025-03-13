import { FaArrowRight } from "react-icons/fa";
import { FC } from "react";

const SearchInputLong: FC = () => {
  return (
    <div className="w-full max-w-[1080px] min-h-[50px] bg-[#007F33] rounded-full flex items-center px-4 relative">
      {/* Input */}
      <input
        type="text"
        placeholder="Search..."
        className="pl-[10px] pr-[50px] min-h-[40px] bg-transparent outline-none text-[#ADCDB9] font-bold placeholder-[#ADCDB9] text-lg w-full"
      />
      
      {/* Tombol */}
      <button className="w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center absolute right-[15px]">
        <FaArrowRight className="text-orange-500 text-lg" />
      </button>
    </div>
  );
};


export default SearchInputLong;