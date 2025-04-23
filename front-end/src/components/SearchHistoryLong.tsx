import React, { useState } from 'react'; // <-- Make sure to include this import
import { FaTimes } from 'react-icons/fa';

interface SearchHistoryLongProps {
    setIsFocused: (val: boolean) => void;
    setInputValue: (val: string) => void;
}

const SearchHistoryLong: React.FC<SearchHistoryLongProps> = ({ setIsFocused, setInputValue }) => {
    const [history, setHistory] = useState([
        "Product A",
        "Product B",
        "Product C",
        "Product D",
        "Product E",
    ]);

    const removeHistoryItem = (index: number) => {
        setHistory((prev) => prev.filter((_, i) => i !== index));
        setIsFocused(true); // Keep the pop-up open
    };

    return (
        <div
            className="w-full max-w-[1080px] mx-auto lg:transform lg:translate-x-[-5px] bg-[#ADCDB9] rounded-2xl px-4 py-3 shadow-md z-[10] "
            onMouseDown={(e) => e.stopPropagation()} // Prevent closing the pop-up on click inside
        >
            <div
                className={`flex flex-col space-y-2 overflow-y-auto transition-all duration-300 ${history.length > 3 ? "max-h-[160px]" : "max-h-full"}`}
            >
                {history.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center px-4 py-2 border-b border-gray-400 last:border-none hover:bg-[#8DBA9E] transition-all duration-200"
                    >
                        {/* Item Name (Clicked, input value changes & pop-up closes) */}
                        <span
                            className="text-[#007F33] font-semibold cursor-pointer"
                            onClick={() => {
                                setInputValue(item);
                                setIsFocused(false); // Close the pop-up
                            }}
                        >
                            {item}
                        </span>
                        {/* FaTimes button (Removes the product, but keeps the pop-up) */}
                        <button
                            onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from triggering
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

export default SearchHistoryLong;
