const SectionTitle = ({ title, description }: { title: string; description: string }) => {
    return (
      <div className="w-full max-w-[1080px] flex flex-col">
        <h2 className="text-[#F25500] text-xl font-bold">{title}</h2>
        <p className="text-[#A3A3A3] text-sm mb-1">{description}</p>
      </div>
    );
  };
  
  export default SectionTitle;
  