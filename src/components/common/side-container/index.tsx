import { twMerge } from "tailwind-merge";

import { ArrowLeftCircle } from "lucide-react";

import type { SideContainerProps } from "./types";

export function SideContainer({
  title,
  className,
  children,
  handleClose,
}: SideContainerProps) {
  return (
    <aside
      className={twMerge(
        "absolute z-100 left-0 bottom-0 w-full h-screen flex flex-col items-start space-y-2 border shadow-md bg-white lg:relative lg:h-auto",
        className,
      )}
    >
      <div className="w-full flex items-center space-x-5 p-3 border-b">
        <span
          className="cursor-pointer active:text-retro-blue active:scale-110 lg:hover:text-[var(--retro-blue)]"
          onClick={handleClose}
        >
          <ArrowLeftCircle />
        </span>
        <h2 className="text-3xl">{title}</h2>
      </div>

      <div className="w-full p-4">{children}</div>
    </aside>
  );
}
