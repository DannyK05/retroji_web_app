import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import CommentCard from "../../../components/core/comment_section/components/CommentCard";
import { useGetUserCommentsQuery } from "../../../store/api/profile";
import type { TSection } from "../types";

export default function CommentsSection({ userId }: TSection) {
  const { data, isLoading } = useGetUserCommentsQuery(userId);
  return (
    <section className="w-full flex flex-col items-center space-y-3 pt-2 pb-5 px-3">
      {isLoading ? (
        <LoadingScreen />
      ) : data && data.data.comments.length > 0 ? (
        data?.data.comments.map(({ content, author, created_at }, index) => (
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
    </section>
  );
}
