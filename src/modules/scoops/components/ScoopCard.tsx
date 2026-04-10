import { useState } from "react";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import { Diamond, HeartIcon } from "lucide-react";

import { getRelativeTime } from "../../../lib/helpers";

import type { ScoopCardProps } from "../types";

export default function ScoopCard({
  id,
  userId,
  image,
  name,
  date,
  content,
  likeCount,
  isLiked,
  repliesCount,
  handleReplies,
  handleLike,
}: ScoopCardProps) {
  const [clickLiked, setClickedLiked] = useState(isLiked ?? false);

  return (
    <div className="flex items-start w-full p-1 text-3xl">
      <div className="h-23 flex flex-col items-center border border-r-0">
        <img className="h-19 object-cover" src={image} alt={name} />
        <span className="w-full flex-1 text-center text-lg text-white bg-black">
          Scoop
        </span>
      </div>

      <div className="w-full flex min-h-23 flex-col items-start space-y-1 border">
        <div className="flex w-full items-center justify-between text-xl text-white bg-black px-1">
          <p>
            <Link
              className="text-white hover:underline"
              to={`/profile/${userId}`}
            >
              {name}
            </Link>
          </p>
          <span>{getRelativeTime(date)}</span>
        </div>

        <p className="text-2xl px-2">{content}</p>

        <div className="w-full flex items-center space-x-4 px-4 border-t">
          <span
            onClick={() => {
              setClickedLiked((prev) => !prev);
              handleLike(id);
            }}
            className={twJoin(
              (clickLiked || isLiked) && "text-retro-blue lg:hover:text-black",
              "flex items-center space-x-1 cursor-pointer lg:hover:text-[var(--retro-blue)] active:text-[var(--retro-blue)] active:scale-110",
            )}
          >
            <HeartIcon className="size-5" />{" "}
            <span className="text-lg">{likeCount}</span>
          </span>

          <span
            onClick={() => handleReplies(id)}
            className="flex items-center space-x-1 cursor-pointer lg:hover:text-[var(--retro-blue)] active:text-[var(--retro-blue)] active:scale-110"
          >
            <Diamond className="size-5" />
            <span className="text-lg">{repliesCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
