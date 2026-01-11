import { InputHTMLAttributes } from "react";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
};
export default function Input({ type = "text", ...rest }: InputProps) {
  return (
    <input
      className="w-45 outline-1 border-[1px] p-1 text-3xl"
      {...rest}
      type={type}
    />
  );
}
