import { Loader, SendHorizontal } from "lucide-react";

import { useHandleApiMessage } from "../../../common/message-banner/hooks";
import { usePostScoopsMutation } from "../../../../store/api/scoops";

import Button from "../../../common/button";
import Input from "../../../common/input";

import type { TErrorResponse } from "../../../../store/types/generic";
import type { PostRepliesFormProps } from "../types";

export default function PostRepliesForm({
  repliesPayload,
  refetch,
  handleRepliesPayload,
}: PostRepliesFormProps) {
  const [postReplies, { isLoading: isPostingReplies }] =
    usePostScoopsMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const handlePostReplies = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postReplies(repliesPayload);
      if (response.data) {
        handleApiMessage(response?.data);
        handleRepliesPayload("");
      }
      refetch?.();
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  return (
    <form onSubmit={handlePostReplies}>
      <div className="w-full absolute bottom-0 left-0 flex items-end bg-white">
        <Input
          name="Replies"
          className="w-9/10 h-10"
          type="text"
          value={repliesPayload.content}
          onChange={(e) => {
            handleRepliesPayload(e.target.value);
          }}
          placeholder="What's on your mind ?"
        />
        <Button
        isLoading={isPostingReplies}
          type="submit"
          disabled={isPostingReplies || repliesPayload.content === ""}
          className="flex-1 h-10"
        >
          {isPostingReplies ? <Loader /> : <SendHorizontal />}
        </Button>
      </div>
    </form>
  );
}
