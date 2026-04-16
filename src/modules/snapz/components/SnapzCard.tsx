import { useState } from "react";
import { DiamondIcon, ThumbsUpIcon } from "lucide-react";
import { Link } from "react-router";
import { twJoin, twMerge } from "tailwind-merge";

import Button from "../../../components/common/button";

import type { SnapzProps } from "../types";
import { getRelativeTime } from "../../../lib/helpers";

export default function SnapzCard({
  id,
  userId,
  className,
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
  const [clickLiked, setClickedLiked] = useState(isLiked ?? false);

  return (
    <div
      className={twMerge(
        "flex w-full flex-col items-start bg-white border",
        className,
      )}
    >
      <div className="w-full flex items-center text-2xl bg-[var(--retro-blue)] text-white justify-between p-2">
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
          className={twMerge(
            "group",
            isLiked || clickLiked ? "text-retro-blue lg:hover:text-white" : "",
          )}
          onClick={(e) => {
            setClickedLiked((prev) => !prev);
            handleLike(id, e);
          }}
        >
          <ThumbsUpIcon className="text-inherit" />
          <span className="text-2xl">{like_count}</span>
        </Button>
        <Button onClick={() => handleComments(id)}>
          <DiamondIcon /> <span className="text-2xl">{comment_count}</span>
        </Button>
      </div>
    </div>
  );
}
