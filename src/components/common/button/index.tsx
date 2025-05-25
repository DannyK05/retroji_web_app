import React from "react";

type ButtonProps = { children: React.ReactNode };

export default function Button({ children }: ButtonProps) {
  return <button className="border w-full bg-grey-400 ">{children}</button>;
}
