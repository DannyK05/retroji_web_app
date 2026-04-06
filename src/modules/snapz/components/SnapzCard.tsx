import { useState } from "react";
import { DiamondIcon, ThumbsUpIcon } from "lucide-react";

import Button from "../../../components/common/button";

import type { SnapzProps } from "../types";
import { twJoin } from "tailwind-merge";
import { getRelativeTime } from "../../../lib/helpers";

export default function SnapzCard({
  id,
  name,
  date,
  images,
  caption,
  like_count,
  isLiked,
  comment_count,
  handleComments,
  handleLike,
}: SnapzProps) {
  const [clickLiked, setClickedLiked] = useState(false);

  return (
    <div className="flex w-full flex-col items-start bg-white border">
      <div className="w-full flex items-center text-2xl bg-[var(--retro-blue)] text-white justify-between p-2">
        <p>{name}</p>
        <span>{getRelativeTime(date)}</span>
      </div>
      <div className="w-full grid grid-cols-2 gap-1 px-2 flex-1 min-h-0">
        {images.length <= 1 ? (
          <div className="h-full w-full col-span-2 aspect-square">
            <img
              className="w-full h-full object-cover"
              src={images[0]?.image}
              width={340}
              alt="Scoop pic"
            />
          </div>
        ) : (
          images.map((image, index) => (
            <div
              key={index}
              className={twJoin(
                "w-full overflow-hidden",
                index == 0 && "col-span-2",
              )}
            >
              <img
                className="w-full h-full object-cover"
                key={index}
                src={image.image}
                width={340}
                alt={`Scoop pic ${index}`}
              />
            </div>
          ))
        )}
      </div>
      <p className="w-full p-1 text-2xl border-t mt-1">{caption}</p>

      <div className="w-full grid grid-cols-2 gap-1">
        <Button
          onClick={() => {
            setClickedLiked((prev) => !prev);
            handleLike(id);
          }}
        >
          <ThumbsUpIcon
            className={
              isLiked || clickLiked ? "text-retro-blue hover:text-white" : ""
            }
          />{" "}
          <span className="text-2xl">{like_count}</span>
        </Button>{" "}
        <Button onClick={() => handleComments(id)}>
          <DiamondIcon /> <span className="text-2xl">{comment_count}</span>
        </Button>
      </div>
    </div>
  );
}
