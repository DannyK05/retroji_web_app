import { useState } from "react";
import Button from "../../../components/common/button";
import TextArea from "../../../components/common/text-area";
import { usePostScoopsMutation } from "../../../store/api/scoops";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { TErrorResponse } from "../../../store/types/generic";
import { Loader } from "lucide-react";
import { CreateScoopsFormProps } from "../types";

export default function CreateScoopsForm({
  handleClose,
}: CreateScoopsFormProps) {
  const [postScoops, { isLoading: isPostingScoops }] = usePostScoopsMutation();
  const [scoopPayload, setScoopPayload] = useState({
    content: "",
  });

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const handlePostScoop = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postScoops(scoopPayload);
      if (response.data) {
        handleApiMessage(response?.data);
        setScoopPayload({
          content: "",
        });
        handleClose();
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handlePostScoop}>
        <div className="w-full flex flex-col items-center space-y-2">
          <TextArea
            name="content"
            className="w-full"
            value={scoopPayload.content}
            onChange={(e) => {
              setScoopPayload({
                content: e.target.value,
              });
            }}
            placeholder="Create your content.... "
          />

          <Button
            type="submit"
            disabled={isPostingScoops || scoopPayload.content === ""}
            className="w-35 h-10 p-2"
          >
            {isPostingScoops ? <Loader /> : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
