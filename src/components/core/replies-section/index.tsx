import { useEffect, useState } from "react";

import { useHandleApiMessage } from "../../common/message-banner/hooks";
import {
  useGetAllScoopsByIdQuery,
  useLikeScoopsMutation,
} from "../../../store/api/scoops";

import { SideContainer } from "../../common/side-container";
import PostRepliesForm from "./components/PostRepliesForm";
import EmptyScreen from "../../common/empty-screen";
import LoadingScreen from "../../common/loading-screen";
import ScoopCard from "../../../modules/scoops/components/ScoopCard";

import type { RepliesSectionProps } from "./types";
import type { TErrorResponse } from "../../../store/types/generic";
import type { TScoops } from "../../../store/types/scoops";

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
  const [repliesScoopStack, setRepliesScoopStack] = useState<TScoops[]>([]);

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

  const handleReplies = (parent: TScoops) => {
    setRepliesIdStack((prev) => [parent.id, ...prev]);
    setRepliesScoopStack((prev) => [...prev, parent]);
  };

  const handleCloseReplies = () => {
    if (repliesIdStack.length === 1 && repliesScoopStack.length === 0) {
      handleClose();
    } else {
      const newRepliesIdStack = [...repliesIdStack];
      const newRepliesScoopStack = [...repliesScoopStack];

      newRepliesIdStack.shift();
      newRepliesScoopStack.pop();

      setRepliesIdStack([...newRepliesIdStack]);
      setRepliesScoopStack([...newRepliesScoopStack]);
    }
  };

  useEffect(() => {
    setRepliesIdStack([repliesPayload.parent_id ?? ""]);
  }, [repliesPayload.parent_id]);

  return (
    <SideContainer
      isOpen={isOpen}
      title={
        repliesScoopStack.length > 0
          ? `Replies to ${repliesScoopStack[repliesScoopStack.length - 1].author.username}'s scoop`
          : "Replies"
      }
      handleClose={handleCloseReplies}
    >
      <div className="w-full h-[calc(100dvh-150px)] flex flex-col items-center space-y-2 overflow-y-auto lg:h-[320px]">
        {repliesScoopStack.length > 0 && (
          <>
            {" "}
            <div className="w-full py-2 border-b-2">
              <ScoopCard
                key={repliesScoopStack[repliesScoopStack.length - 1].id}
                id={repliesScoopStack[repliesScoopStack.length - 1].id}
                author={repliesScoopStack[repliesScoopStack.length - 1].author}
                content={
                  repliesScoopStack[repliesScoopStack.length - 1].content
                }
                date={
                  repliesScoopStack[repliesScoopStack.length - 1].created_at
                }
                likeCount={
                  repliesScoopStack[repliesScoopStack.length - 1].like_count
                }
                isLiked={
                  repliesScoopStack[repliesScoopStack.length - 1].is_liked
                }
                repliesCount={
                  repliesScoopStack[repliesScoopStack.length - 1].replies_count
                }
                handleLike={handleLike}
              />
            </div>
            <p className="text-2xl text-grey-600">Replies</p>
          </>
        )}

        {isLoadingAllReplies ? (
          <LoadingScreen />
        ) : replies?.data.length !== 0 ? (
          replies?.data.map((scoop: TScoops) => (
            <ScoopCard
              key={scoop.id}
              id={scoop.id}
              author={scoop.author}
              content={scoop.content}
              date={scoop.created_at}
              likeCount={scoop.like_count}
              isLiked={scoop.is_liked}
              repliesCount={scoop.replies_count}
              handleReplies={() => handleReplies(scoop)}
              handleLike={handleLike}
            />
          ))
        ) : (
          <EmptyScreen />
        )}
      </div>

      <PostRepliesForm
        repliesPayload={{
          ...repliesPayload,
          parent_id: repliesIdStack[0],
        }}
        refetch={refetch}
        handleRepliesPayload={handleRepliesPayload}
      />
    </SideContainer>
  );
}
