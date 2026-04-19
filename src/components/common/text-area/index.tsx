import { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};
export default function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={twMerge(`w-45 outline-1 border p-1 text-3xl`, className)}
    ></textarea>
  );
}
