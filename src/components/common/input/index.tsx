import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: string;
  type?: string;
};
export default function Input({
  type = "text",
  className,
  error,
  ...rest
}: InputProps) {
  return (
    <div className="w-auto flex flex-col items-start">
      <input
        className={twMerge(`w-45 outline-1 border p-1 text-3xl`, className)}
        {...rest}
        type={type}
      />{" "}
      {error && <span className="text-red-600 text-xl">{error}</span>}
    </div>
  );
}
