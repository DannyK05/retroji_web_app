import { useState } from "react";
import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import CommentsSection from "../../../components/core/comment_section";
import { useGetUserSnapzQuery } from "../../../store/api/profile";
import { useLikeSnapzMutation } from "../../../store/api/snapz";
import { TPostCommentDto } from "../../../store/types/snapz";

import SnapzCard from "../../snapz/components/SnapzCard";
import type { TSection } from "../types";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { TErrorResponse } from "../../../store/types/generic";

export default function SnapzSection({ userId }: TSection) {
  const {
    data,
    isLoading,
    refetch: refetchUserSnapz,
  } = useGetUserSnapzQuery(userId);
  const [like] = useLikeSnapzMutation();

  const [commentPayload, setCommentPayload] = useState<TPostCommentDto>({
    content: "",
    snapz_id: "",
  });
  const [isSideOpen, setIsSideOpen] = useState(false);

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const handleCommentPayload = (content: string, snapz_id?: string) => {
    setCommentPayload((prev) => ({
      content: content !== undefined ? content : prev.content,
      snapz_id: snapz_id ? snapz_id : prev.snapz_id,
    }));
  };

  const handleisSideOpen = () => {
    setIsSideOpen((prev) => !prev);
  };

  const handleLike = async (snapz_id: string, e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await like({ snapz_id });
      if (response.data) {
        handleApiMessage(response?.data);
      }
      refetchUserSnapz();
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleDisplayComments = (snapz_id: string) => {
    if (!isSideOpen) {
      setIsSideOpen(true);
      setCommentPayload({ content: "", snapz_id: snapz_id });
    }
  };

  return (
    <section className="w-full h-full grid grid-cols-2 gap-2 py-2 px-3">
      <div className="w-full h-[500px] flex flex-col items-center space-y-3 py-2 px-3 overflow-y-auto">
        {isLoading ? (
          <LoadingScreen />
        ) : data && data.data.snapz.length > 0 ? (
          data?.data.snapz.map(
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
          )
        ) : (
          <EmptyScreen />
        )}
      </div>

      {isSideOpen && (
        <div className="w-full h-full flex items-center justify-center">
          <CommentsSection
            handleClose={handleisSideOpen}
            commentPayload={commentPayload}
            handleCommentPayload={handleCommentPayload}
            refetch={refetchUserSnapz}
          />
        </div>
      )}
    </section>
  );
}
