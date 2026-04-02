import { DiamondIcon, ThumbsUpIcon } from "lucide-react";

import Button from "../../../components/common/button";

import type { SnapzProps } from "../types";
import { useState } from "react";

export default function SnapzCard({
  id,
  name,
  date,
  image,
  caption,
  like_count,
  comment_count,
  handleComments,
  handleLike,
}: SnapzProps) {
  const returnedDate = new Date(date);

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex w-auto flex-col items-start border border-b-0">
      <div className="w-full flex items-center text-2xl bg-[var(--retro-blue)] text-white justify-between p-2">
        <p>{name}</p>
        <span>{returnedDate.toLocaleString()}</span>
      </div>
      <div className="px-2">
        <img src={image} width={340} alt="Scoop pic" />
      </div>
      <p className="p-1 text-2xl">{caption}</p>

      <div className="w-full grid grid-cols-2 gap-1">
        <Button
          onClick={() => {
            setIsLiked((prev) => !prev);
            handleLike(id);
          }}
        >
          <ThumbsUpIcon className={isLiked ? "text-retro-blue" : ""} />{" "}
          <span className="text-2xl">{like_count}</span>
        </Button>{" "}
        <Button onClick={() => handleComments(id)}>
          <DiamondIcon /> <span className="text-2xl">{comment_count}</span>
        </Button>
      </div>
    </div>
  );
}
