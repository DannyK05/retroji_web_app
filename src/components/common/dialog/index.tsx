import { XIcon } from "lucide-react";

import Button from "../button";

import type { DialogProps } from "./types";
import { twMerge } from "tailwind-merge";

export default function Dialog({
  children,
  title,
  isOpen,
  handleClose,
}: DialogProps) {
  return (
    <div
      onClick={handleClose}
      className={twMerge(
        "z-10 absolute h-screen w-screen top-0 left-0 flex items-center justify-center px-2 bg-black/40 cursor-pointer scale-0 opacity-0 transition-all duration-300",
        isOpen && "scale-100 opacity-100",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-h-3/5 flex flex-col items-start bg-white border lg:w-1/2 lg:h-3/5"
      >
        <div className="w-full flex items-center justify-between px-2 py-1 border-b">
          <h2 className="text-3xl">{title}</h2>

          <Button onClick={handleClose} className="w-10 py-1">
            <XIcon />
          </Button>
        </div>

        <div className="w-full h-full flex items-start justify-center p-2 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
