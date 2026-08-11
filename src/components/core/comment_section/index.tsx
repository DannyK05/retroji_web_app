import { useGetAllCommentsBySnapzIdInfiniteQuery } from "../../../store/api/snapz";

import { SideContainer } from "../../common/side-container";
import { InfiniteScrollContainer } from "../../common/infinite-scroll";
import EmptyScreen from "../../common/empty-screen";
import LoadingScreen from "../../common/loading-screen";
import CommentCard from "./components/CommentCard";
import PostCommentForm from "./components/PostCommentForm";

import type { CommentSectionProps } from "./types";

export default function CommentsSection({
  commentPayload,
  handleCommentPayload,
  handleClose,
  isOpen,
  refetch,
}: CommentSectionProps) {
  const {
    data: comments,
    isLoading: isLoadingAllComments,
    isFetching: isFetchingAllComments,
    hasNextPage,
    fetchNextPage,
  } = useGetAllCommentsBySnapzIdInfiniteQuery(
    {
      snapz_id: commentPayload.snapz_id,
    },
    {
      skip: !commentPayload.snapz_id,
    },
  );

  const infiniteComments = comments?.pages.flatMap((data) => data.data) ?? [];

  return (
    <SideContainer
      isOpen={isOpen}
      className="lg:col-span-2"
      title="Comments"
      handleClose={handleClose}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full h-[calc(100dvh-150px)] flex flex-col items-center overflow-y-auto lg:h-[320px]">
          {isLoadingAllComments || isFetchingAllComments ? (
            <LoadingScreen />
          ) : infiniteComments.length !== 0 ? (
            <InfiniteScrollContainer
              className="space-y-2"
              dataLength={infiniteComments.length}
              hasMore={hasNextPage}
              handleNext={fetchNextPage}
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
        </div>

        <PostCommentForm
          commentPayload={commentPayload}
          handleCommentPayload={handleCommentPayload}
          refetch={refetch}
        />
      </div>
    </SideContainer>
  );
}
