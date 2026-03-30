import React from "react";

type ButtonProps = { children: React.ReactNode };

export default function Button({ children }: ButtonProps) {
  return (
    <button className="w-full flex items-center justify-center space-x-1 bg-grey-400 border">
      {children}
    </button>
  );
}
