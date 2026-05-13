import { InputHTMLAttributes } from "react";

export type TPreview = { name: string; url: string };

export type ImageInputRef = {
  reset: () => void;
};

export type ImageInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  uploadLimit?: number;
  handleImages: (selectedFiles: File[]) => void;
  multiple?: boolean;
  handleRemoveImage: (name: string) => string | undefined;
};