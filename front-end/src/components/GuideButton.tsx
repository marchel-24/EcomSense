import { MdOutlineQuestionMark } from "react-icons/md";

const GuideButton = () => {
    return (
      <button className="w-10 h-10 sm:w-14 sm:h-14 bg-[#F25500] flex items-center justify-center rounded-md sm:rounded-xl flex-shrink-0 transition-all duration-300">
        <MdOutlineQuestionMark className="text-[#F4E2D0] text-3xl font-bold" />
      </button>
    );
  };
  
  export default GuideButton;
  
