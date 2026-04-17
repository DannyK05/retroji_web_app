import React, { useRef, useState } from "react";

import { PlusSquare } from "lucide-react";

import { useHandleApiMessage } from "../../components/common/message-banner/hooks";

import {
  useGetAllSnapzQuery,
  useLikeSnapzMutation,
} from "../../store/api/snapz";

import SnapzCard from "./components/SnapzCard";

import Button from "../../components/common/button";

import type { TErrorResponse } from "../../store/types/generic";
import type { TPostCommentDto } from "../../store/types/snapz";
import Dialog from "../../components/common/dialog";
import CreateSnapzForm from "./components/CreateSnapzForm";

import LoadingScreen from "../../components/common/loading-screen";
import EmptyScreen from "../../components/common/empty-screen";

import CommentsSection from "../../components/core/comment_section";

export default function Snapz() {
  const { data: snapz, isLoading: isLoadingAllSnapz } = useGetAllSnapzQuery();

  const [like] = useLikeSnapzMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const [commentPayload, setCommentPayload] = useState<TPostCommentDto>({
    content: "",
    snapz_id: "",
  });

  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const previousScrollRef = useRef(0);

  const handleisSideOpen = () => {
    setIsSideOpen((prev) => !prev);
  };

  const handleisDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleCommentPayload = (content: string, snapz_id?: string) => {
    setCommentPayload((prev) => ({
      content: content !== undefined ? content : prev.content,
      snapz_id: snapz_id ? snapz_id : prev.snapz_id,
    }));
  };

  const handleDisplayComments = (snapz_id: string) => {
    if (!isSideOpen) {
      setIsSideOpen(true);
      setCommentPayload({ content: "", snapz_id: snapz_id });
    }
  };

  const handleLike = async (snapz_id: string, e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="w-full pt-2">
      <div className="w-full flex items-center justify-between border-b py-1 lg:border-b-0">
        <h1 className="text-4xl">Snapz</h1>{" "}
        <Button onClick={handleisDialogOpen} className="w-auto h-10 lg:hidden">
          <div className="flex items-center space-x-2 text-2xl">
            <PlusSquare /> <p>Post Snapz</p>
          </div>
        </Button>
      </div>
      {isLoadingAllSnapz ? (
        <div className="h-[calc(100vh-125px)]">
          <LoadingScreen />
        </div>
      ) : snapz && snapz.data.length === 0 ? (
        <div className="h-[calc(100vh-125px)]">
          <EmptyScreen />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-x-4 py-2 lg:grid-cols-5">
          <div
            onScroll={(e) => {
              const currentScroll = e.currentTarget.scrollTop;
              if (
                isSideOpen &&
                currentScroll > previousScrollRef.current + 17
              ) {
                setIsSideOpen(false);
              }
              previousScrollRef.current = currentScroll;
            }}
            className="w-full h-[calc(100vh-125px)] flex flex-col items-start space-y-4 col-span-3 pb-2 px-3 overflow-y-auto lg:h-[calc(100vh-120px)]"
          >
            {snapz?.data.map(
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
                  className={
                    isSideOpen && commentPayload.snapz_id !== id
                      ? "opacity-40"
                      : ""
                  }
                  key={id}
                  id={id}
                  name={author.username}
                  userId={author.id}
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
            )}
          </div>

          {isSideOpen && (
            <CommentsSection
              handleClose={handleisSideOpen}
              commentPayload={commentPayload}
              handleCommentPayload={handleCommentPayload}
            />
          )}
        </div>
      )}

      {isDialogOpen && (
        <Dialog handleClose={handleisDialogOpen} title="Post Snapz">
          <CreateSnapzForm handleClose={handleisDialogOpen} />
        </Dialog>
      )}

      <Button
        onClick={handleisDialogOpen}
        className="hidden w-auto absolute right-10 bottom-10 lg:block"
      >
        <div className="flex items-center space-x-2 text-3xl">
          <PlusSquare /> <p>Post Snapz</p>
        </div>
      </Button>
    </div>
  );
}
