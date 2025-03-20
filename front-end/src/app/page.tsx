import SearchInputLong from "@/components/SearchInputLong";
import ProductCard from "@/components/ProductCard";
import OtherProduct from "@/components/OtherProduct";
import ReviewCard from "@/components/ReviewCard";
import BubbleText from "@/components/BubbleText";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col h-screen bg-[#F7F0EA] ">
      {/* Header */}
      <div className="fixed top-5 left-0 w-full z-10 bg-transparent flex justify-center">
        <Header />
      </div>

      {/* Konten utama yang bisa di-scroll */}
      <div className="flex-1 overflow-auto mt-[80px] mb-[80px] flex flex-col items-center w-full mx-auto p-8 pl-11 lg:pl-8 gap-4">

        {/* BubbleText */}
        <div className="w-full flex justify-center mb-6">
          <BubbleText text="Iphone 13" />
        </div>

        {/* Review Section */}
        <SectionTitle title="Worth To Buy!!!" description="iPhone 13 gets great reviews! Check out their thoughts!" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-[880px]">
          <ReviewCard username="biutifafp" review="MasyaAllahhh cantik bangettt ya Allahhh warnanya. Rasanya kayak mimpi bisa kebeliii hp ini 🥺🥺🥺🥺" />
          <ReviewCard username="fird4_" review="Warnanya beneran lebih cakep dari yang di foto, nggak nyesel belii." />
          <ReviewCard username="safrinaaa" review="Packingnya rapi dan aman. Barang sesuai deskripsi!" />
          <ReviewCard username="rezky.m" review="Waduhhh, beli ini bikin hati bahagiaaa! Sumpah recommended banget deh!" />
        </div>


        {/* Product Section */}
        <SectionTitle title="Where To Buy?" description="Here are the best places to buy iPhone 13 from trusted stores. Tap to see more!" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductCard
            image="/iphone.png"
            price="9,499 juta"
            storeName="Cellular World Official Store"
            productLink="https://example.com/product1"
          />
          <ProductCard
            image="/iphone.png"
            price="9,499 juta"
            storeName="Cellular World Official Store"
            productLink="https://example.com/product1"
          />
          <ProductCard
            image="/iphone.png"
            price="9,499 juta"
            storeName="Cellular World Official Store"
            productLink="https://example.com/product1"
          />
          <ProductCard
            image="/iphone.png"
            price="9,499 juta"
            storeName="Cellular World Official Store"
            productLink="https://example.com/product1"
          />
        </div>

        {/* Other Products Section */}
        <SectionTitle title="Here's Similar Product For You" description="Let's explore similar product and see what people are saying!" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full lg:w-[900px]">
          <OtherProduct
            image="/iphonebiru.jpg"
            productName="iPhone 13"
            price="9-10 juta"
          />
          <OtherProduct
            image="/iphonebiru.jpg"
            productName="iPhone 13"
            price="9-10 juta"
          />
          <OtherProduct
            image="/iphonebiru.jpg"
            productName="iPhone 13"
            price="9-10 juta"
          />
        </div>
      </div>

      {/* Search Input */}
      <div className="fixed bottom-10 w-full z-10 bg-transparent flex justify-center px-4 md:px-8 lg:px-1 lg:pr-[13px]">
        <SearchInputLong />
      </div>
    </main>
  );
}


