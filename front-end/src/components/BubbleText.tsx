import { FC } from "react";

interface BubbleTextProps {
  text: string;
}

const BubbleText: FC<BubbleTextProps> = ({ text }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1080px] w-full bg-transparent flex justify-end  ">
        <div className="bg-[#007F33] text-[#FFFFFF] text-lg font-semibold px-5 py-2 rounded-3xl break-words w-fit max-w-full">
          {text}
        </div>
      </div>
    </div>
  );
};

export default BubbleText;
