import React from "react";
import { FaStar, FaSignOutAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
  name?: string;
  onClose: () => void;
  onOpenAuth: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ name, onClose, onOpenAuth }) => {
  const router = useRouter();

  return (
    <div className="absolute right-0 mt-2 w-[180px] bg-[#F69059] shadow-lg rounded-lg z-50">
      <ul className="flex flex-col py-1">
        {name ? (
          <>
            {/* Favorite */}
            <li
              className="flex items-center px-4 py-2 text-white hover:bg-[#e27847] cursor-pointer"
              onClick={() => {
                router.push("/favorite"); // Navigasi ke halaman /favorite
                onClose();
              }}
            >
              <FaStar className="text-white mr-2" />
              Favorite
            </li>

            {/* Log Out */}
            <li
              className="flex items-center px-4 py-2 text-white hover:bg-[#e27847] cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("user");           
                  if (window.google?.accounts?.id) {
                    window.google.accounts.id.disableAutoSelect();
                  }
                }
                onClose();
                router.push("/");
                window.location.reload();
              }}
            >
              <FaSignOutAlt className="mr-2 text-white" />
              Log Out
            </li>
          </>
        ) : (
          <li
            className="flex items-center px-4 py-2 text-white hover:bg-[#e27847] cursor-pointer"
            onClick={() => {
              onOpenAuth(); // Buka pop-up login
              onClose();
            }}
          >
            <FiLogIn className="mr-2 text-white" />
            Login
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileMenu;
