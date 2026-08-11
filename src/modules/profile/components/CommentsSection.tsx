import { useGetUserCommentsInfiniteQuery } from "../../../store/api/profile";
import { InfiniteScrollContainer } from "../../../components/common/infinite-scroll";
import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import CommentCard from "../../../components/core/comment_section/components/CommentCard";

import type { TSection } from "../types";

export default function CommentsSection({ userId }: TSection) {
  const {
    data: comments,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetUserCommentsInfiniteQuery(userId);
  const infiniteComments = comments?.pages.flatMap((data) => data.data) ?? [];
  return (
    <section className="w-full pt-2 pb-5 px-3">
      {isLoading ? (
        <LoadingScreen />
      ) : infiniteComments && infiniteComments.length > 0 ? (
        <InfiniteScrollContainer
          className="flex flex-col items-start space-y-3"
          dataLength={infiniteComments.length}
          hasMore={hasNextPage}
          handleNext={() => !isFetching && fetchNextPage()}
        >
          {infiniteComments.map(
            ({ id, content, author, created_at }, index) => (
              <CommentCard
                id={id}
                key={index}
                content={content}
                author={author}
                createdAt={created_at}
              />
            ),
          )}
        </InfiniteScrollContainer>
      ) : (
        <EmptyScreen />
      )}
    </section>
  );
}
