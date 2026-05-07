import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  className,
  isLoading = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={twMerge(
        `w-full flex items-center justify-center space-x-1 bg-grey-400 px-3 py-2 shadow-lg border text-2xl bg-white cursor-pointer active:shadow-sm active:border-3 lg:hover:bg-[var(--retro-blue)] lg:hover:text-white disabled:cursor-disabled`,
        className,
      )}
    >
      {isLoading ? <div className="dot-loader"></div> : children}
    </button>
  );
}
