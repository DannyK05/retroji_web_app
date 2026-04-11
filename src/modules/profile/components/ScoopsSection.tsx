import EmptyScreen from "../../../components/common/empty-screen";
import LoadingScreen from "../../../components/common/loading-screen";
import { useGetUserScoopsQuery } from "../../../store/api/profile";
import ScoopCard from "../../scoops/components/ScoopCard";
import type { TSection } from "../types";

export default function ScoopsSection({ userId }: TSection) {
  const { data, isLoading } = useGetUserScoopsQuery(userId);
  return (
    <section className="w-full flex items-center space-y-3 py-2 px-3">
      {isLoading ? (
        <LoadingScreen />
      ) : data && data.data.scoops.length > 0 ? (
        data?.data?.scoops.map(
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
              userId={author.id}
              name={author.username}
              content={content}
              date={created_at}
              image={"/public/assets/images/profile_pic.jpg"}
              likeCount={like_count}
              isLiked={is_liked}
              repliesCount={replies_count}
              handleReplies={() => console.log("replies")}
              handleLike={() => console.log("likes")}
            />
          ),
        )
      ) : (
        <EmptyScreen />
      )}
    </section>
  );
}
