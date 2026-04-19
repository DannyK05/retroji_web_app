import { Loader, SendHorizontal } from "lucide-react";

import { useHandleApiMessage } from "../../../common/message-banner/hooks";

import Button from "../../../common/button";
import Input from "../../../common/input";

import { usePostCommentMutation } from "../../../../store/api/snapz";

import { TErrorResponse } from "../../../../store/types/generic";
import type { PostCommentFormProps } from "../types";

export default function PostCommentForm({
  commentPayload,
  handleCommentPayload,
  refetch,
}: PostCommentFormProps) {
  const [postComment, { isLoading: isPostingComment }] =
    usePostCommentMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postComment(commentPayload);
      if (response.data) {
        handleApiMessage(response?.data);
        handleCommentPayload("");
      }
      refetch?.();
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };
  return (
    <form onSubmit={handlePostComment}>
      <div className="w-full absolute bottom-0 left-0 flex items-end">
        <Input
          name="Comment"
          className="w-9/10 h-10"
          type="text"
          value={commentPayload.content}
          onChange={(e) => {
            handleCommentPayload(e.target.value);
          }}
          placeholder="What's on your mind ?"
        />
        <Button
          type="submit"
          disabled={isPostingComment || commentPayload.content === ""}
          className="w-10 h-10"
        >
          {isPostingComment ? <Loader /> : <SendHorizontal />}
        </Button>
      </div>
    </form>
  );
}
