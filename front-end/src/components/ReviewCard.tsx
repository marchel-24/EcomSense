import { FC } from "react";

interface ReviewCardProps {
  username: string;
  review: string;
}

const ReviewCard: FC<ReviewCardProps> = ({ username, review }) => {
  return (
    <div className="w-[440px] bg-white rounded-2xl shadow-md p-4 border border-gray-300">
      <p className="font-bold text-gray-900">@{username}</p>
      <p className="text-gray-500 text-sm line-clamp-2 overflow-hidden min-h-[40px]">
        {review}
      </p>
    </div>
  );
};

export default ReviewCard;
