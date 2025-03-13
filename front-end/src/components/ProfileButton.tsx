"use client";

import React, { useState } from "react";
import ProfilePopUp from "@/components/ProfilePopUp";

const ProfileButton = ({ name, profilePic }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative" onClick={() => setIsOpen(true)}>
        {/* Normal screen */}
        <div className="hidden md:flex items-center bg-[#F25500] px-3 py-2 rounded-xl min-w-[100px] max-w-[150px] cursor-pointer transition-all duration-300">
          <span className="text-[#F4E2D0] text-xl font-bold truncate flex-1">{name}</span>
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full ml-2.5 object-cover aspect-square"
          />
        </div>
        {/* Small screen */}
        <div className="md:hidden w-10 h-10 sm:w-14 sm:h-14 bg-orange-500 flex items-center justify-center rounded-md sm:rounded-xl cursor-pointer transition-all duration-300">
          <img src={profilePic} alt="Profile" className="w-7 h-7 sm:w-10 sm:h-10 rounded-full object-cover aspect-square" />
        </div>
      </div>
      {isOpen && <ProfilePopUp name={name} profilePic={profilePic} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProfileButton;
