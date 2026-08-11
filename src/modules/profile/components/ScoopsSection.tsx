import { useRef, useState } from "react";
import { useGetUserScoopsInfiniteQuery } from "../../../store/api/profile";
import { useLikeScoopsMutation } from "../../../store/api/scoops";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { InfiniteScrollContainer } from "../../../components/common/infinite-scroll";
import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import RepliesSection from "../../../components/core/replies-section";
import ScoopCard from "../../scoops/components/ScoopCard";
import type { TSection } from "../types";
import type { TPostScoopsDto } from "../../../store/types/scoops";
import type { TErrorResponse } from "../../../store/types/generic";

export default function ScoopsSection({ userId }: TSection) {
  const {
    data: scoops,
    isLoading,
    isFetching,
    refetch: refetchUserScoops,
    hasNextPage,
    fetchNextPage,
  } = useGetUserScoopsInfiniteQuery(userId);

  const [likeScoops] = useLikeScoopsMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const [repliesPayload, setRepliesPayload] = useState<TPostScoopsDto>({
    content: "",
    parent_id: "",
  });

  const infiniteScoops = scoops?.pages.flatMap((data) => data.data) ?? [];
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
  ) : infiniteScoops && infiniteScoops.length > 0 ? (
    <section className="w-full h-auto grid grid-cols-1 gap-2 px-3 overflow-y-hidden lg:grid-cols-2">
      <div
        onScroll={(e) => {
          const currentScroll = e.currentTarget.scrollTop;
          if (isSideOpen && currentScroll > previousScrollRef.current + 10) {
            setIsSideOpen(false);
          }
          previousScrollRef.current = currentScroll;
        }}
        className="w-full h-[500px] py-2 px-1 overflow-y-auto lg:px-3"
      >
        <InfiniteScrollContainer
          className="flex flex-col items-start space-y-3"
          dataLength={infiniteScoops.length}
          hasMore={hasNextPage}
          handleNext={() => !isFetching && fetchNextPage()}
        >
          {infiniteScoops.map(
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
                author={author}
                content={content}
                date={created_at}
                likeCount={like_count}
                isLiked={is_liked}
                repliesCount={replies_count}
                handleReplies={handleDisplayReplies}
                handleLike={handleLike}
              />
            ),
          )}
        </InfiniteScrollContainer>
      </div>

      <div className="w-full h-full flex items-start justify-center lg:pt-2">
        <RepliesSection
          isOpen={isSideOpen}
          handleClose={handleisSideOpen}
          repliesPayload={repliesPayload}
          handleRepliesPayload={handleRepliesPayload}
          refetch={refetchUserScoops}
        />
      </div>
    </section>
  ) : (
    <EmptyScreen />
  );
}
