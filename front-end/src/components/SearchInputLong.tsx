import { FaArrowRight } from "react-icons/fa";
import { FC, useState } from "react";

interface SearchInputLongProps {
  setIsFocused: (val: boolean) => void;
}

interface SearchInputLongProps {
  setIsFocused: (val: boolean) => void;
  onSubmit: (val: string) => void;
}

const SearchInputLong: FC<SearchInputLongProps> = ({ setIsFocused, onSubmit }) => {
  const [localInput, setLocalInput] = useState("");

  const handleSubmit = () => {
    onSubmit(localInput);
    setLocalInput("");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1080px] w-full min-h-[50px] bg-[#007F33] rounded-full flex items-center px-4 relative">
        <input
          type="text"
          placeholder="Search..."
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          onFocus={() => setIsFocused(true)}
          className="pl-[10px] pr-[50px] min-h-[40px] bg-transparent outline-none w-full 
            placeholder-[#ADCDB9] font-bold"
        />
        <button
          onClick={handleSubmit}
          className="w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center absolute right-[15px] hover:bg-[#E6E6E6]"
        >
          <FaArrowRight className="text-orange-500 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default SearchInputLong;
