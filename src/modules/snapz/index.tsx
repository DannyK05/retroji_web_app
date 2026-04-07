import React, { useState } from "react";

import { Loader, PlusSquare, SendHorizontal } from "lucide-react";

import { useHandleApiMessage } from "../../components/common/message-banner/hooks";

import {
  useLazyGetAllCommentsBySnapzIdQuery,
  useGetAllSnapzQuery,
  usePostCommentMutation,
  useLikeSnapzMutation,
} from "../../store/api/snapz";

import { SideContainer } from "../../components/common/side-container";
import SnapzCard from "./components/SnapzCard";
import Input from "../../components/common/input";
import Button from "../../components/common/button";

import type { TErrorResponse } from "../../store/types/generic";
import type { TPostCommentDto } from "../../store/types/snapz";
import Dialog from "../../components/common/dialog";
import CreateSnapzForm from "./components/CreateSnapzForm";
import { getRelativeTime } from "../../lib/helpers";
import LoadingScreen from "../../components/common/loading-screen";
import EmptyScreen from "../../components/common/empty-screen";

export default function Snapz() {
  const {
    data: snapz,
    isLoading: isLoadingAllSnapz,
    isFetching: isFetchingAllSnapz,
  } = useGetAllSnapzQuery();
  
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

  const [like] = useLikeSnapzMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const [commentPayload, setCommentPayload] = useState<TPostCommentDto>({
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
      <div className="w-full grid grid-cols-5 gap-x-4 py-2">
        <div className="w-full h-[calc(100vh-100px)] flex flex-col items-start space-y-4 col-span-3 pb-2 px-3 overflow-y-auto">
          {isLoadingAllSnapz || isFetchingAllSnapz ? (
            <LoadingScreen />
          ) : snapz?.data ? (
            snapz?.data.map(
              ({
                id,
                author,
                created_at,
                images,
                caption,
                like_count,
                comment_count,
                is_liked,
              }) => (
                <SnapzCard
                  key={id}
                  id={id}
                  name={author.username}
                  date={created_at}
                  images={images}
                  caption={caption}
                  like_count={like_count}
                  isLiked={is_liked}
                  comment_count={comment_count}
                  handleComments={handleDisplayComments}
                  handleLike={handleLike}
                />
              ),
            )
          ) : (
            <EmptyScreen />
          )}
        </div>

        {isSideOpen && (
          <SideContainer
            className="col-span-2"
            title="Comments"
            handleClose={handleisSideOpen}
          >
            <div className="w-full h-[350px] flex flex-col items-center space-y-2 overflow-y-auto">
              {isLoadingAllComments || isFetchingAllComments ? (
                <LoadingScreen />
              ) : comments?.data ? (
                comments?.data.map(({ content, author, created_at }, index) => (
                  <div
                    className="w-full flex flex-col items-start p-1 border"
                    key={index}
                  >
                    <div className="w-full flex items-center justify-between text-2xl border-b">
                      <p>{author.username} says</p>
                      <span>{getRelativeTime(created_at)}</span>
                    </div>
                    <p className="text-3xl">{content}</p>
                  </div>
                ))
              ) : (
                <EmptyScreen />
              )}
            </div>

            <form onSubmit={handlePostComment}>
              <div className="w-full absolute bottom-0 left-0 flex items-end">
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
                  className="w-10 h-10"
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
          <CreateSnapzForm handleClose={handleisDialogOpen} />
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
