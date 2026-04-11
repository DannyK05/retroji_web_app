import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import { getRelativeTime } from "../../../lib/helpers";
import { useGetUserCommentsQuery } from "../../../store/api/profile";
import type { TSection } from "../types";

export default function CommentsSection({ userId }: TSection) {
  const { data, isLoading } = useGetUserCommentsQuery(userId);
  return (
    <section className="w-full flex items-center space-y-3 py-2 px-3">
      {isLoading ? (
        <LoadingScreen />
      ) : data && data.data.comments.length > 0 ? (
        data?.data.comments.map(({ content, author, created_at }, index) => (
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
    </section>
  );
}
