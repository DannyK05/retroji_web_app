import { useEffect, useState } from "react";
import ScoopCard from "../../../modules/scoops/components/ScoopCard";
import {
  useGetAllScoopsByIdQuery,
  useLikeScoopsMutation,
} from "../../../store/api/scoops";
import { TErrorResponse } from "../../../store/types/generic";
import EmptyScreen from "../../common/empty-screen";
import LoadingScreen from "../../common/loading-screen";
import { useHandleApiMessage } from "../../common/message-banner/hooks";
import { SideContainer } from "../../common/side-container";
import PostRepliesForm from "./components/PostRepliesForm";
import { RepliesSectionProps } from "./types";

export default function RepliesSection({
  repliesPayload,
  handleRepliesPayload,
  handleClose,
  isOpen,
  refetch,
}: RepliesSectionProps) {
  const [repliesIdStack, setRepliesIdStack] = useState([
    repliesPayload.parent_id ?? "",
  ]);

  const { data: replies, isLoading: isLoadingAllReplies } =
    useGetAllScoopsByIdQuery(repliesIdStack[0]);

  const [likeScoops] = useLikeScoopsMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const handleLike = async (scoop_id: string) => {
    try {
      const response = await likeScoops({ scoop_id });
      if (response.data) {
        handleApiMessage(response?.data);
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleReplies = (parentId: string) => {
    setRepliesIdStack((prev) => [parentId, ...prev]);
  };

  const handleCloseReplies = () => {
    if (repliesIdStack.length === 1) {
      handleClose();
    } else {
      const newRepliesIdStack = [...repliesIdStack];
      newRepliesIdStack.shift();
      setRepliesIdStack([...newRepliesIdStack]);
    }
  };

  useEffect(() => {
    setRepliesIdStack([repliesPayload.parent_id ?? ""]);
  }, [repliesPayload.parent_id]);

  return (
    <SideContainer
      isOpen={isOpen}
      title={`Replies to ${repliesIdStack[0]}`}
      handleClose={handleCloseReplies}
    >
      <div className="w-full h-[calc(100dvh-150px)] flex flex-col items-center space-y-2 overflow-y-auto lg:h-[350px]">
        {isLoadingAllReplies ? (
          <LoadingScreen />
        ) : replies?.data.length !== 0 ? (
          replies?.data.map(
            ({
              id,
              content,
              author,
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
                image={"/assets/images/profile_pic.jpg"}
                likeCount={like_count}
                isLiked={is_liked}
                repliesCount={replies_count}
                handleReplies={handleReplies}
                handleLike={handleLike}
              />
            ),
          )
        ) : (
          <EmptyScreen />
        )}
      </div>

      <PostRepliesForm
        repliesPayload={{ ...repliesPayload, parent_id: repliesIdStack[0] }}
        refetch={refetch}
        handleRepliesPayload={handleRepliesPayload}
      />
    </SideContainer>
  );
}
