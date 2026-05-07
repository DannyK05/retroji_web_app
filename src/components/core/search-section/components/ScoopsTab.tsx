import { useRef, useState } from "react";
import ScoopCard from "../../../../modules/scoops/components/ScoopCard";
import { useLikeScoopsMutation } from "../../../../store/api/scoops";
import { TPostScoopsDto } from "../../../../store/types/scoops";
import EmptyScreen from "../../../common/empty-screen";
import { useHandleApiMessage } from "../../../common/message-banner/hooks";
import RepliesSection from "../../replies-section";
import { ScoopsTabProps } from "../types";
import { TErrorResponse } from "../../../../store/types/generic";

export default function ScoopsTab({ data }: ScoopsTabProps) {
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
      //  refetchUserScoops();
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  return data && data.length > 0 ? (
    <section className="w-full h-full grid grid-cols-1 gap-2 py-2 px-3 overflow-hidden lg:grid-cols-2">
      <div
        onScroll={(e) => {
          const currentScroll = e.currentTarget.scrollTop;
          if (isSideOpen && currentScroll > previousScrollRef.current + 10) {
            setIsSideOpen(false);
          }
          previousScrollRef.current = currentScroll;
        }}
        className="w-full flex flex-col items-center space-y-3 py-2 px-1 lg:max-h-[450px] lg:px-3 lg:overflow-y-auto"
      >
        {data?.map(
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
              image={"/public/assets/images/profile_pic.png"}
              likeCount={like_count}
              isLiked={is_liked}
              repliesCount={replies_count}
              handleReplies={handleDisplayReplies}
              handleLike={handleLike}
            />
          ),
        )}
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <RepliesSection
          isOpen={isSideOpen}
          handleClose={handleisSideOpen}
          repliesPayload={repliesPayload}
          handleRepliesPayload={handleRepliesPayload}
          //  refetch={refetchUserScoops}
        />
      </div>
    </section>
  ) : (
    <EmptyScreen />
  );
}
