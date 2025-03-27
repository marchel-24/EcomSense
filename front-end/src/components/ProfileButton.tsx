"use client";

import React, { useState, useRef, useEffect } from "react";
import ProfileMenu from "@/components/ProfileMenu";
import AuthPopUp from "@/components/AuthPopUp";

interface ProfileButtonProps {
  name?: string;
  profilePic?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ name, profilePic }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={buttonRef}>
      {/* Tombol Profile */}
      <div
        className="flex items-center bg-[#F25500] px-2 md:px-3 rounded-md sm:rounded-xl cursor-pointer transition-all duration-300 
        min-w-[20px] md:min-w-[80px] max-w-[180px] lg:max-w-[200px] h-10 md:h-12 lg:h-14"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#F4E2D0] font-bold truncate flex-1 
        text-base md:text-lg lg:text-xl transition-all duration-300">
          {name || "Profile"}
        </span>
        {profilePic && (
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-full object-cover transition-all duration-300 
            w-7 h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 ml-2"
          />
        )}
      </div>

      {/* Pop-up Menu */}
      {isOpen && (
        <ProfileMenu
          name={name}
          onClose={() => setIsOpen(false)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      {/* Pop-up Login/Sign Up */}
      {isAuthOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
          <AuthPopUp onClose={() => setIsAuthOpen(false)} />
        </div>
      )}


    </div>
  );
};

export default ProfileButton;
