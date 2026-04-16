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
  refetch,
}: RepliesSectionProps) {
  const 
    {
      data: replies,
      isLoading: isLoadingAllReplies
    }= useGetAllScoopsByIdQuery(repliesPayload.parent_id ?? "");

  

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

  return (
    <SideContainer title="Replies" handleClose={handleClose}>
      <div className="w-full h-[calc(100vh-150px)] flex flex-col items-center space-y-2 overflow-y-auto lg:h-[350px]">
        {isLoadingAllReplies ? (
          <LoadingScreen />
        ) : replies?.data ? (
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
                image={"/public/assets/images/profile_pic.jpg"}
                likeCount={like_count}
                isLiked={is_liked}
                repliesCount={replies_count}
                handleReplies={() => console.log("here")}
                handleLike={handleLike}
              />
            ),
          )
        ) : (
          <EmptyScreen />
        )}
      </div>

      <PostRepliesForm
        repliesPayload={repliesPayload}
        refetch={refetch}
        handleRepliesPayload={handleRepliesPayload}
      />
    </SideContainer>
  );
}
