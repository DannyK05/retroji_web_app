import { useState } from "react";

import { Loader } from "lucide-react";

import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { usePostSnapzMutation } from "../../../store/api/snapz";

import Button from "../../../components/common/button";
import TextArea from "../../../components/common/text-area";
import ImageInput from "../../../components/common/image-input";

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
            name="snapz_image"
            handleRemoveImage={handleRemoveImage}
            onChange={(e) => {
              setSnapzPayload((prev) => ({
                caption: prev.caption,
                images: e.target.files ? Array.from(e.target.files) : [],
              }));
            }}
          />

          <Button
            type="submit"
            disabled={isPostingSnapz || snapzPayload.caption === ""}
            className="w-35 h-10 p-2"
          >
            {isPostingSnapz ? <Loader /> : <p>Post</p>}
          </Button>
        </div>
      </form>
    </div>
  );
}
