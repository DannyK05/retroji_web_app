import { useState } from "react";
import Button from "../../../components/common/button";
import TextArea from "../../../components/common/text-area";
// import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
// import { TErrorResponse } from "../../../store/types/generic";

export default function CreateScoopsForm() {
  const [scoopPayload, setScoopPayload] = useState({
    content: "",
  });

  //   const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  //   const handlePostScoop = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       const response = null
  //       if (response.data) {
  //         handleApiMessage(response?.data);
  //       }
  //     } catch (error) {
  //       handleErrorMessage(error as TErrorResponse);
  //     }
  //   };

  return (
    <div className="w-full">
      <form>
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
            disabled={scoopPayload.content === ""}
            className="w-35 h-10 p-2"
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
