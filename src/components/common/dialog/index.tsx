import { XIcon } from "lucide-react";

import Button from "../button";

import type { DialogProps } from "./types";

export default function Dialog({ children, title, handleClose }: DialogProps) {
  return (
    <div
      onClick={handleClose}
      className="z-10 absolute h-screen w-screen top-0 left-0 flex items-center justify-center bg-black/40 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-1/2 h-3/5 flex flex-col items-start bg-white border"
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
