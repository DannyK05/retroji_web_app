import { DiamondIcon, ThumbsUpIcon } from "lucide-react";
import { SnapzProps } from "../types";
import Button from "../../../components/common/button";

export default function SnapzCard({
  name,
  date,
  image,
  caption,
  like_count,
  comment_count,
}: SnapzProps) {
  const returnedDate = new Date(date);
  return (
    <div className="flex w-auto flex-col items-start border ">
      <div className="w-full flex items-center text-2xl bg-[var(--retro-blue)] text-white justify-between p-2">
        <p>{name}</p>
        <span>{returnedDate.toLocaleString()}</span>
      </div>
      <div className="px-2">
        <img src={image} width={340} alt="Scoop pic" />
      </div>
      <p className="p-1 text-2xl">{caption}</p>
      <div className="w-full h-10 grid grid-cols-2 gap-1 pt-2">
        <Button>
          <ThumbsUpIcon /> <span className="text-2xl">{like_count}</span>
        </Button>{" "}
        <Button>
          <DiamondIcon /> <span className="text-2xl">{comment_count}</span>
        </Button>
      </div>
    </div>
  );
}
