import React, { useState } from "react";

import { Loader, PlusSquare, SendHorizontal } from "lucide-react";

import { useHandleApiMessage } from "../../components/common/message-banner/hooks";

import {
  useLazyGetAllCommentsBySnapzIdQuery,
  useGetAllSnapzQuery,
  usePostCommentMutation,
  useLikeMutation,
} from "../../store/api/snapz";

import { SideContainer } from "../../components/common/side-container";
import SnapzCard from "./components/SnapzCard";
import Input from "../../components/common/input";
import Button from "../../components/common/button";

import type { TErrorResponse } from "../../store/types/generic";
import type { TPostCommentData } from "../../store/types/snapz";
import Dialog from "../../components/common/dialog";
import CreateSnapzForm from "./components/CreateSnapzForm";

export default function Snapz() {
  const { data: snapz, isLoading: isLoadingAllSnapz } = useGetAllSnapzQuery();
  const [
    getComments,
    {
      data: comments,
      isLoading: isLoadingAllComments,
      isFetching: isFetchingAllComments,
    },
  ] = useLazyGetAllCommentsBySnapzIdQuery();
  const [postComment, { isLoading: isPostingComment }] =
    usePostCommentMutation();
  const [like] = useLikeMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const [commentPayload, setCommentPayload] = useState<TPostCommentData>({
    content: "",
    snapz_id: "",
  });

  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleisSideOpen = () => {
    setIsSideOpen((prev) => !prev);
  };

  const handleisDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleDisplayComments = (snapz_id: string) => {
    if (!isSideOpen) {
      setIsSideOpen(true);
      getComments({ snapz_id });
      setCommentPayload({ content: "", snapz_id: snapz_id });
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postComment(commentPayload);
      if (response.data) {
        handleApiMessage(response?.data);
        setCommentPayload((prev) => ({ ...prev, content: "" }));
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleLike = async (snapz_id: string) => {
    try {
      const response = await like({ snapz_id });
      if (response.data) {
        handleApiMessage(response?.data);
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl">Snapz</h1>
      <div className="w-full grid grid-cols-2 gap-x-4 py-2">
        <div className="w-full flex flex-col h-[calc(100vh-100px)] pb-2 items-start space-y-4 overflow-y-auto">
          {isLoadingAllSnapz
            ? "..."
            : snapz?.data.map(
                ({
                  id,
                  author,
                  created_at,
                  image,
                  caption,
                  like_count,
                  comment_count,
                }) => (
                  <SnapzCard
                    key={id}
                    id={id}
                    name={author.toString()}
                    date={created_at}
                    image={image}
                    caption={caption}
                    like_count={like_count}
                    comment_count={comment_count}
                    handleComments={handleDisplayComments}
                    handleLike={handleLike}
                  />
                ),
              )}
        </div>

        {isSideOpen && (
          <SideContainer title="Comments" handleClose={handleisSideOpen}>
            <div className="w-full h-[350px] flex flex-col items-center space-y-2 overflow-y-auto">
              {isLoadingAllComments || isFetchingAllComments
                ? "..."
                : comments?.data.map(({ content, author }, index) => (
                    <div
                      className="w-full flex flex-col items-start p-1 border"
                      key={index}
                    >
                      <p className="w-full text-2xl border-b">{author} says</p>
                      <p className="text-3xl">{content}</p>
                    </div>
                  ))}
            </div>

            <form onSubmit={handlePostComment}>
              <div className="w-full  absolute bottom-0 left-0 flex items-end">
                <Input
                  name="Comment"
                  className="w-9/10 h-10"
                  type="text"
                  value={commentPayload.content}
                  onChange={(e) => {
                    setCommentPayload((prev) => ({
                      content: e.target.value,
                      snapz_id: prev.snapz_id,
                    }));
                  }}
                  placeholder="What's on your mind ?"
                />
                <Button
                  type="submit"
                  disabled={isPostingComment || commentPayload.content === ""}
                  className="w-1/10 h-10"
                >
                  {isPostingComment ? <Loader /> : <SendHorizontal />}
                </Button>
              </div>
            </form>
          </SideContainer>
        )}
      </div>

      {isDialogOpen && (
        <Dialog handleClose={handleisDialogOpen} title="Create Snapz">
          <CreateSnapzForm />
        </Dialog>
      )}

      <Button
        onClick={handleisDialogOpen}
        className="w-auto absolute right-10 bottom-10"
      >
        <div className="flex items-center space-x-2 text-3xl">
          <PlusSquare /> <p>Create Snapz</p>
        </div>
      </Button>
    </div>
  );
}
