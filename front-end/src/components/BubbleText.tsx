import { FC } from "react";

interface BubbleTextProps {
  text: string;
}

const BubbleText: FC<BubbleTextProps> = ({ text }) => {
  return (
    <div className="bg-[#007F33] text-[#FFFFFF] text-lg font-semibold px-5 py-2 rounded-3xl break-words w-fit max-w-full">
      {text}
    </div> 
  );
};

export default BubbleText;
