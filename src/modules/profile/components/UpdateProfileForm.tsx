import Input from "../../../components/common/input";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../../store/api/profile";
import { TUpdateUserProfileDto } from "../../../store/types/profile";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { ImageInput } from "../../../components/common/image-input";
import { TErrorResponse } from "../../../store/types/generic";
import { TUser } from "../../../store/types/auth";
import { getUserData } from "../../../lib/helpers";
import LoadingScreen from "../../../components/common/loading-screen";
import { useState } from "react";
import { UpdateProfileFormProps } from "../types";

export default function UpdateProfileForm({
  handleClose,
}: UpdateProfileFormProps) {
  const user: TUser = getUserData();
  const { data, isLoading } = useGetUserProfileQuery(`${user.id}`);
  const [update, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const [updatePayload, setUpdatePayload] = useState<TUpdateUserProfileDto>({
    username: data?.data.profile.user.username ?? "",
    bio: data?.data.profile.bio ?? "",
    image: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateFormData = new FormData();
    const payload = { ...updatePayload };

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFormData.append(key, value);
      }
    });

    try {
      const response = await update(updateFormData).unwrap();

      if (response.data) {
        handleApiMessage(response);
        handleClose();
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleRemoveImage = () => {
    const removedImage = updatePayload.image;

    if (removedImage) {
      const image_payload = [updatePayload.image];
      image_payload.pop();
      setUpdatePayload((prev) => ({ ...prev, image: image_payload[0] }));
      return removedImage.name;
    }
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">profile picture:</span>
          <ImageInput
            name="image"
            handleRemoveImage={handleRemoveImage}
            handleImages={(files: File[]) => {
              setUpdatePayload((prev) => ({ ...prev, image: files[0] }));
            }}
            uploadLimit={1}
          />
        </label>

        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">user name:</span>
          <Input
            title="User Name"
            placeholder="User Name"
            value={updatePayload.username}
            onChange={(e) =>
              setUpdatePayload((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </label>

        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">bio:</span>
          <Input
            title="Bio"
            placeholder="Bio"
            value={updatePayload.bio}
            onChange={(e) =>
              setUpdatePayload((prev) => ({
                ...prev,
                bio: e.target.value,
              }))
            }
          />
        </label>

        <button
          type="submit"
          className="text-center flex items-center justify-center font-bold text-press border p-1 w-full cursor-pointer"
          disabled={isUpdating}
        >
          {isUpdating ? "..." : "Update"}
        </button>
      </form>
    </div>
  );
}
