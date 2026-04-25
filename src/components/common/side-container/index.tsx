import { twMerge } from "tailwind-merge";

import { ArrowLeftCircle } from "lucide-react";

import type { SideContainerProps } from "./types";

export function SideContainer({
  title,
  className,
  children,
  isOpen,
  handleClose,
}: SideContainerProps) {
  return (
    <aside
      className={twMerge(
        "fixed inset-0 z-100 w-full h-[100dvh] flex flex-col items-start border shadow-md bg-white translate-y-full opacity-0 transition-all duration-300 lg:relative lg:h-auto",
        isOpen && "translate-y-0 opacity-100",
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

      <div className="w-full flex-1 flex flex-col min-h-0 px-1 py-2">
        {children}
      </div>
    </aside>
  );
}
