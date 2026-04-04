import { Diamond, HeartIcon } from "lucide-react";
import type { ScoopCardProps } from "../types";

export default function ScoopCard({
  image,
  name,
  time,
  content,
}: ScoopCardProps) {
  return (
    <div className="flex items-start w-4/5 p-1 text-3xl">
      <div className="h-23 flex flex-col items-center border border-r-0">
        <img className="h-19 object-cover" src={image} alt={name} />
        <span className="w-full flex-1 text-center text-lg text-white bg-black">
          Scoop
        </span>
      </div>

      <div className="w-full flex min-h-23 flex-col items-start space-y-1 border">
        <div className="flex w-full items-center justify-between text-xl text-white bg-black px-1">
          <p>{name}</p>
          <span>{time}</span>
        </div>
        <p className="text-2xl px-2">{content}</p>

        <div className="w-full flex items-center space-x-4 px-4 border-t">
          <span className="cursor-pointer lg:hover:text-[var(--retro-blue)] active:text-[var(--retro-blue)] active:scale-110">
            <HeartIcon className="size-5" />
          </span>
          <span className="cursor-pointer lg:hover:text-[var(--retro-blue)] active:text-[var(--retro-blue)] active:scale-110">
            <Diamond className="size-5" />
          </span>
        </div>
      </div>
    </div>
  );
}
