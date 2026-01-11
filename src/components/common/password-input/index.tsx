import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({ ...rest }: PasswordInputProps) {
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const handlePasswordVisibility = () => {
    if (inputType == "text") {
      setInputType("password");
    } else {
      setInputType("text");
    }
  };
  return (
    <div className="flex items-center border space-x-1 pr-1">
      <input className="outline-none p-1 text-3xl" {...rest} type={inputType} />
      <span
        className="border cursor-pointer"
        onClick={handlePasswordVisibility}
      >
        {inputType == "text" ? <EyeIcon /> : <EyeClosedIcon />}
      </span>
    </div>
  );
}
