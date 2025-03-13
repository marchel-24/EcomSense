import Image from "next/image";
import GuideButton from "@/components/GuideButton";
import ProfileButton from "@/components/ProfileButton";

const Header = () => {
  return (
    <header className="max-w-[1080px] w-full flex justify-between items-center px-4 sm:px-5 md:px-6 bg-transparent gap-7">

      <GuideButton />

      <div className="flex-1 flex justify-center">
        <Image
          src="/EcomSense.png"
          alt="Ecom Sense Logo"
          width={400}
          height={140}
          className="w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] transition-all duration-300"
        />
      </div>

      <ProfileButton name="icaaaaaaaa" profilePic="/maudy-ayunda.png" />
    </header>
  );
};

export default Header;
