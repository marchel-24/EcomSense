const ScoreAndTitle = ({ title, description, score }: { title: string; description: string; score: string }) => {
    return (
        <div className="w-full max-w-[1080px] flex items-center gap-4">
            {/* Kotak Score (hanya muncul kalau score ada) */}
            {score && (
                <div className="bg-orange-500 text-white font-bold text-xl px-3 py-2 rounded-lg inline-block">
                    {score}
                </div>
            )}

            {/* Section Title & Description */}
            <div className="flex-1">
                <h2 className="text-[#F25500] text-xl font-bold">{title}</h2>
                <p className="text-[#A3A3A3] text-sm mb-1">{description}</p>
            </div>
        </div>
    );
};

export default ScoreAndTitle;
