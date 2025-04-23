import Image from "next/image";
import GuideButton from "@/components/GuideButton";
import ProfileButton from "@/components/ProfileButton";

interface HeaderProps {
  hideLogo?: boolean; // Prop opsional untuk menyembunyikan logo
}

const Header: React.FC<HeaderProps> = ({ hideLogo = false }) => {
  return (
    <header className="max-w-[1080px] w-full flex justify-between items-center px-4 sm:px-5 md:px-6 bg-transparent gap-7">
      <GuideButton />

      {/* Logo hanya muncul jika hideLogo === false */}
      {!hideLogo && (
        <div className="flex-1 flex justify-center">
          <Image
            src="/EcomSense.png"
            alt="EcomSense Logo"
            width={400}
            height={140}
            className="w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] transition-all duration-300 transform hover:scale-105"
          />
        </div>
      )}

      <ProfileButton name="" profilePic="/maudy-ayunda.png" />
    </header>
  );
};

export default Header;
