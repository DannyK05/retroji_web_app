import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import { useGetUserSnapzQuery } from "../../../store/api/profile";
import SnapzCard from "../../snapz/components/SnapzCard";
import type { TSection } from "../types";

export default function SnapzSection({ userId }: TSection) {
  const { data, isLoading } = useGetUserSnapzQuery(userId);

  return (
    <section className="w-full h-full flex items-center space-y-3 py-2 px-3">
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
              handleComments={() => console.log("comments")}
              handleLike={() => console.log("like")}
            />
          ),
        )
      ) : (
        <EmptyScreen />
      )}
    </section>
  );
}
