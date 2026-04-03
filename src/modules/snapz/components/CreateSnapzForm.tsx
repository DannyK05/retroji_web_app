import { useState } from "react"; 

import { Loader } from "lucide-react";

import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { usePostSnapzMutation } from "../../../store/api/snapz";

import Button from "../../../components/common/button";
import TextArea from "../../../components/common/text-area";
import ImageInput from "../../../components/common/image-input";

import type { TPostSnapzData } from "../../../store/types/snapz";
import type { TErrorResponse } from "../../../store/types/generic";



export default function CreateSnapzForm() {
  const [snapzPayload, setSnapzPayload] = useState<TPostSnapzData>({
    caption: "",
    image: [],
  });
  const [postSnapz, { isLoading: isPostingSnapz }] = usePostSnapzMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const handlePostSnapz = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postSnapz(snapzPayload);
      if (response.data) {
        handleApiMessage(response?.data);
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleRemoveImage = (name: string) => {
    const removedImage = snapzPayload.image.find((image) => name == image.name);
    if (removedImage) {
      const image_payload = [...snapzPayload.image];
      image_payload.splice(snapzPayload.image.indexOf(removedImage), 1);
      setSnapzPayload((prev) => ({ ...prev, image: image_payload }));
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
                image: prev.image,
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
                image: e.target.files ? Array.from(e.target.files) : [],
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
