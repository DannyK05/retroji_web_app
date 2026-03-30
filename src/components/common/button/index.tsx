import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className="w-full flex items-center justify-center space-x-1 bg-grey-400 shadow-lg border cursor-pointer active:shadow-sm lg:hover:bg-[var(--retro-blue)] lg:hover:text-white"
    >
      {children}
    </button>
  );
}
