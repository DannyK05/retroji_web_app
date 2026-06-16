import { XIcon } from "lucide-react";

import Button from "../button";

import type { DialogProps } from "./types";
import { twMerge } from "tailwind-merge";

export default function Dialog({
  children,
  className,
  containerClassName,
  title,
  isOpen,
  handleClose,
}: DialogProps) {
  return (
    <div
      onClick={handleClose}
      className={twMerge(
        "z-10 absolute h-screen w-full top-0 left-0 flex items-center justify-center px-2 bg-black/40 cursor-pointer scale-0 opacity-0 transition-all duration-300",
        isOpen && "scale-100 opacity-100",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          "max-h-3/5 flex flex-col items-center bg-white border lg:w-auto lg:h-4/5",
          containerClassName,
        )}
      >
        <div className="w-full flex items-center justify-between space-x-1 px-2 py-1 border-b">
          <h2 className="text-3xl">{title}</h2>

          <Button onClick={handleClose} className="w-10 py-1">
            <XIcon />
          </Button>
        </div>

        <div
          className={twMerge(
            "min-w-[350px] flex items-start p-2 overflow-y-auto lg:min-w-[500px] lg:h-[300px]",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function PopupDialog({
  children,
  containerClassName,
  isOpen,
  handleClose,
}: DialogProps) {
  return (
    <div
      onClick={handleClose}
      className={twMerge(
        "z-10 absolute h-screen w-screen top-0 left-0 flex items-center justify-center px-2 py-4 bg-black/40 cursor-pointer scale-0 opacity-0 transition-all duration-300",
        isOpen && "scale-100 opacity-100",
        containerClassName,
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-auto flex flex-col items-end justify-center p-2"
      >
        <Button onClick={handleClose} className="w-10 py-1">
          <XIcon />
        </Button>
        {children}
      </div>
    </div>
  );
}
