import { useRef, useState } from "react";

import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { usePostSnapzMutation } from "../../../store/api/snapz";

import Button from "../../../components/common/button";
import TextArea from "../../../components/common/text-area";
import {
  ImageInput,
  ImageInputRef,
} from "../../../components/common/image-input";

import type { TPostSnapzDto } from "../../../store/types/snapz";
import type { TErrorResponse } from "../../../store/types/generic";
import type { CreateSnapzFormProps } from "../types";

export default function CreateSnapzForm({ handleClose }: CreateSnapzFormProps) {
  const [snapzPayload, setSnapzPayload] = useState<TPostSnapzDto>({
    caption: "",
    images: [],
  });
  const [postSnapz, { isLoading: isPostingSnapz }] = usePostSnapzMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const imageInputRef = useRef<ImageInputRef>(null);

  const handlePostSnapz = async (e: React.FormEvent) => {
    e.preventDefault();
    const snapzFormData = new FormData();
    snapzFormData.append("caption", snapzPayload.caption);
    if (snapzPayload.images) {
      snapzPayload.images.forEach((image) => {
        snapzFormData.append("images", image);
      });
    }

    try {
      const response = await postSnapz(snapzFormData);
      if (response.data) {
        handleApiMessage(response?.data);
        setSnapzPayload({
          caption: "",
          images: [],
        });
        imageInputRef.current?.reset();
        handleClose();
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleRemoveImage = (name: string) => {
    const removedImage = snapzPayload.images.find(
      (image) => name == image.name,
    );
    if (removedImage) {
      const image_payload = [...snapzPayload.images];
      image_payload.splice(snapzPayload.images.indexOf(removedImage), 1);
      setSnapzPayload((prev) => ({ ...prev, images: image_payload }));
      return removedImage.name;
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handlePostSnapz}>
        <div className="w-full flex flex-col items-center space-y-2">
          <TextArea
            name="caption"
            className="w-full"
            value={snapzPayload.caption}
            onChange={(e) => {
              setSnapzPayload((prev) => ({
                caption: e.target.value,
                images: prev.images,
              }));
            }}
            placeholder="Create your caption.... "
          />

          <ImageInput
            ref={imageInputRef}
            name="snapz_image"
            handleRemoveImage={handleRemoveImage}
            handleImages={(files: File[]) => {
              setSnapzPayload((prev) => ({ ...prev, images: files }));
            }}
          />

          <Button
            type="submit"
            isLoading={isPostingSnapz}
            disabled={isPostingSnapz || snapzPayload.caption === ""}
            className="w-35 h-10 p-2"
          >
           <p>Post</p>
          </Button>
        </div>
      </form>
    </div>
  );
}
