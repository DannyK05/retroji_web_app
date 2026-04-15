import { useGetAllCommentsBySnapzIdQuery } from "../../../store/api/snapz";
import EmptyScreen from "../../common/empty-screen";
import LoadingScreen from "../../common/loading-screen";
import { SideContainer } from "../../common/side-container";
import CommentCard from "./components/CommentCard";
import PostCommentForm from "./components/PostCommentForm";
import { CommentSectionProps } from "./types";

export default function CommentsSection({
  commentPayload,
  handleCommentPayload,
  handleClose,
}: CommentSectionProps) {
  const {
    data: comments,
    isLoading: isLoadingAllComments,
    isFetching: isFetchingAllComments,
  } = useGetAllCommentsBySnapzIdQuery({ snapz_id: commentPayload.snapz_id });

  return (
    <SideContainer
      className="lg:col-span-2"
      title="Comments"
      handleClose={handleClose}
    >
      <div className="w-full h-[calc(100vh-150px)] flex flex-col items-center space-y-2 overflow-y-auto lg:h-[350px]">
        {isLoadingAllComments || isFetchingAllComments ? (
          <LoadingScreen />
        ) : comments?.data ? (
          comments?.data.map(({ content, author, created_at }, index) => (
            <CommentCard
              key={index}
              content={content}
              author={author}
              createdAt={created_at}
            />
          ))
        ) : (
          <EmptyScreen />
        )}
      </div>

      <PostCommentForm
        commentPayload={commentPayload}
        handleCommentPayload={handleCommentPayload}
      />
    </SideContainer>
  );
}
