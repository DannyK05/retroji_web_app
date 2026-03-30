import { ArrowLeftCircle } from "lucide-react";
import { SideContainerProps } from "./types";

export function SideContainer({
  title,
  children,
  handleClose,
}: SideContainerProps) {
  return (
    <aside className="w-full flex flex-col items-start space-y-2 border">
      <div className="w-full flex items-center space-x-5 p-3 border-b">
        <span
          className="cursor-pointer active:text-[var(--retro-blue)] lg:hover:text-[var(--retro-blue)]"
          onClick={handleClose}
        >
          <ArrowLeftCircle />
        </span>{" "}
        <h2 className="text-3xl">{title}</h2>
      </div>

      <div className="p-4">{children}</div>
    </aside>
  );
}
