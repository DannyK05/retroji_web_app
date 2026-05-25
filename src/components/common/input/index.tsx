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
    <div className={twMerge("w-45 flex flex-col items-start", className)}>
      <input
        className="w-full h-full outline-1 border p-1 text-3xl"
        {...rest}
        type={type}
      />{" "}
      {error && <span className="text-red-600 text-xl">{error}</span>}
    </div>
  );
}
