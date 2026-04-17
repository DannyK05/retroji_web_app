import { useRef, useState } from "react";
import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import RepliesSection from "../../../components/core/replies-section";
import { useGetUserScoopsQuery } from "../../../store/api/profile";
import ScoopCard from "../../scoops/components/ScoopCard";
import type { TSection } from "../types";
import { TPostScoopsDto } from "../../../store/types/scoops";
import { useLikeScoopsMutation } from "../../../store/api/scoops";
import { TErrorResponse } from "../../../store/types/generic";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";

export default function ScoopsSection({ userId }: TSection) {
  const {
    data,
    isLoading,
    refetch: refetchUserScoops,
  } = useGetUserScoopsQuery(userId);

  const [likeScoops] = useLikeScoopsMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const [repliesPayload, setRepliesPayload] = useState<TPostScoopsDto>({
    content: "",
    parent_id: "",
  });

  const [isSideOpen, setIsSideOpen] = useState(false);
  const previousScrollRef = useRef(0);

  const handleisSideOpen = () => {
    setIsSideOpen((prev) => !prev);
  };

  const handleRepliesPayload = (content: string, parent_id?: string) => {
    setRepliesPayload((prev) => ({
      content: content !== undefined ? content : prev.content,
      parent_id: parent_id ? parent_id : prev.parent_id,
    }));
  };

  const handleDisplayReplies = (parent_id: string) => {
    if (!isSideOpen) {
      setIsSideOpen(true);
      setRepliesPayload({ content: "", parent_id: parent_id });
    }
  };

  const handleLike = async (scoop_id: string) => {
    try {
      const response = await likeScoops({ scoop_id });
      if (response.data) {
        handleApiMessage(response?.data);
      }
      refetchUserScoops();
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  return isLoading ? (
    <div className="w-full h-full grid cols-span-2">
      <LoadingScreen />
    </div>
  ) : data && data.data.scoops.length > 0 ? (
    <section className="w-full h-full grid grid-cols-1 gap-2 py-2 px-3 lg:grid-cols-2">
      <div
        onScroll={(e) => {
          const currentScroll = e.currentTarget.scrollTop;
          if (isSideOpen && currentScroll > previousScrollRef.current + 10) {
            setIsSideOpen(false);
          }
          previousScrollRef.current = currentScroll;
        }}
        className="w-full flex flex-col items-center space-y-3 py-2 px-1 lg:max-h-[500px] lg:px-3 lg:overflow-y-auto"
      >
        {data?.data?.scoops.map(
          ({
            id,
            author,
            content,
            is_liked,
            like_count,
            replies_count,
            created_at,
          }) => (
            <ScoopCard
              key={id}
              id={id}
              className={
                isSideOpen && repliesPayload.parent_id !== id
                  ? "opacity-50"
                  : ""
              }
              userId={author.id}
              name={author.username}
              content={content}
              date={created_at}
              image={"/public/assets/images/profile_pic.jpg"}
              likeCount={like_count}
              isLiked={is_liked}
              repliesCount={replies_count}
              handleReplies={handleDisplayReplies}
              handleLike={handleLike}
            />
          ),
        )}
      </div>

      {isSideOpen && (
        <div className="w-full h-full flex items-center justify-center">
          <RepliesSection
            handleClose={handleisSideOpen}
            repliesPayload={repliesPayload}
            handleRepliesPayload={handleRepliesPayload}
            refetch={refetchUserScoops}
          />
        </div>
      )}
    </section>
  ) : (
    <EmptyScreen />
  );
}
