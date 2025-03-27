"use client";

import { useState } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import GuidePopUp from "@/components/GuidePopUp";

const GuideButton = () => {
  const [isGuideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setGuideOpen(true)}
        className="w-10 h-10 sm:w-14 sm:h-14 bg-[#F25500] flex items-center justify-center rounded-md sm:rounded-xl flex-shrink-0 transition-all duration-300"
      >
        <MdOutlineQuestionMark className="text-[#F4E2D0] text-3xl font-bold" />
      </button>

      {isGuideOpen && <GuidePopUp onClose={() => setGuideOpen(false)} />}
    </>
  );
};

export default GuideButton;
