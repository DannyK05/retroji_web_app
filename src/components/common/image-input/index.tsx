import {
  InputHTMLAttributes,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import { ImagesIcon, XSquareIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { shortenString } from "../../../lib/helpers";

import type { TPreview } from "./types";

export type ImageInputRef = {
  reset: () => void;
};

type ImageInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  uploadLimit?: number;
  handleImages: (selectedFiles: File[]) => void;
  multiple?: boolean;
  handleRemoveImage: (name: string) => string | undefined;
};

export const ImageInput = forwardRef<ImageInputRef, ImageInputProps>(
  (
    {
      name,
      className,
      handleImages,
      multiple = true,
      uploadLimit = 3,
      handleRemoveImage,
      ...rest
    },
    ref,
  ) => {
    const [imageDisplayName, setImageDisplayName] = useState(
      "No images have been selected",
    );

    const [previews, setPreviews] = useState<TPreview[]>([]);

    const handleImagePreviews = (selectedFiles: File[]) => {
      const newPreviews = Array.from(selectedFiles).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      setPreviews(newPreviews);
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        setPreviews([]);
        setImageDisplayName("No images have been selected");
      },
    }));

    useEffect(() => {
      return () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
      };
    }, [previews]);

    return (
      <div className="w-full flex flex-col items-center space-y-2">
        <label
          className={twMerge(
            `relative outline-1 p-1 shadow-lg border text-2xl cursor-pointer active:shadow-sm active:border-3`,
            className,
          )}
          htmlFor={name}
        >
          <div className="flex min-w-50 flex-col items-center space-y-2 cursor-pointer">
            <ImagesIcon />
            <p>Browse Images</p>
            <span>{shortenString(imageDisplayName, 50)}</span>
            <span>Max. of {uploadLimit} images</span>
          </div>

          <input
            {...rest}
            id={name}
            name={name}
            multiple={multiple}
            className="absolute opacity-0"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              if (previews.length > 0) {
                previews.forEach((preview) => URL.revokeObjectURL(preview.url));
              }
              if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);

                if (selectedFiles) {
                  if (selectedFiles.length > uploadLimit) {
                    const excess = selectedFiles.length - uploadLimit;
                    for (let i = 0; i < excess; ++i) {
                      selectedFiles.pop();
                    }
                    alert(`Maximum of ${uploadLimit} images are allowed`);
                  }
                  handleImages(selectedFiles);
                }
                if (selectedFiles) {
                  handleImagePreviews(selectedFiles);
                  setImageDisplayName(
                    selectedFiles.length > 0
                      ? selectedFiles.map((f) => f.name).join(", ")
                      : "No images have been selected",
                  );
                }
              }
            }}
          />
        </label>

        {previews.length > 0 && (
          <>
            <p className="text-2xl">Attached Images:</p>
            <div className="flex items-center justify-center space-x-2 flex-wrap">
              {previews.map(({ name, url }, index) => (
                <div
                  key={name}
                  onClick={() => {
                    const removedImage = handleRemoveImage(name);

                    if (removedImage) {
                      const removedPreview = previews.find(
                        (image) => image.name == name,
                      );
                      if (removedPreview) {
                        URL.revokeObjectURL(removedPreview.url);

                        const updatedPreviews = previews.filter(
                          (image) => image.name !== name,
                        );
                        setPreviews(updatedPreviews);

                        setImageDisplayName(
                          updatedPreviews.length > 0
                            ? updatedPreviews.map((p) => p.name).join(", ")
                            : "No images have been selected",
                        );
                      }
                    }
                  }}
                  className="group relative border overflow-hidden"
                >
                  <img
                    className="size-[100px] object-cover lg:group-hover:scale-110 lg:group-hover:opacity-50 group-active:border-3"
                    src={url}
                    alt={`preview-${index}`}
                  />
                  <XSquareIcon className="icon hidden absolute top-[40%] left-[40%] group-hover:block" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);
