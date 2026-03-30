import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
};

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={twMerge(
        `w-full flex items-center justify-center space-x-1 bg-grey-400 shadow-lg border cursor-pointer active:shadow-sm lg:hover:bg-[var(--retro-blue)] lg:hover:text-white`,
        className,
      )}
    >
      {children}
    </button>
  );
}
