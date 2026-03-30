import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  type?: string;
};
export default function Input({
  type = "text",
  className,
  ...rest
}: InputProps) {
  return (
    <input
      className={twMerge(`w-45 outline-1 border-[1px] p-1 text-3xl`, className)}
      {...rest}
      type={type}
    />
  );
}
