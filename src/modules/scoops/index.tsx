import { useState } from "react";
import { Edit, Loader, SendHorizontal } from "lucide-react";

import Button from "../../components/common/button";
import Dialog from "../../components/common/dialog";
import CreateScoopsForm from "./components/CreateScoopsForm";
import ScoopCard from "./components/ScoopCard";

import {
  useGetAllScoopsQuery,
  useLazyGetAllScoopsByIdQuery,
  useLikeScoopsMutation,
  usePostScoopsMutation,
} from "../../store/api/scoops";
import LoadingScreen from "../../components/common/loading-screen";
import EmptyScreen from "../../components/common/empty-screen";
import { useHandleApiMessage } from "../../components/common/message-banner/hooks";
import { TPostScoopsDto } from "../../store/types/scoops";
import { TErrorResponse } from "../../store/types/generic";
import Input from "../../components/common/input";
import { SideContainer } from "../../components/common/side-container";

export default function Scoop() {
  const { data: scoops, isLoading: isLoadingScoops } = useGetAllScoopsQuery();

  const [
    getReplies,
    {
      data: replies,
      isLoading: isLoadingAllReplies,
      isFetching: isFetchingAllReplies,
    },
  ] = useLazyGetAllScoopsByIdQuery();

  const [postReplies, { isLoading: isPostingReplies }] =
    usePostScoopsMutation();

  const [likeScoops] = useLikeScoopsMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const [repliesPayload, setRepliesPayload] = useState<TPostScoopsDto>({
    content: "",
    parent_id: "",
  });

  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleisSideOpen = () => {
    setIsSideOpen((prev) => !prev);
  };

  const handleisDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleDisplayReplies = (parent_id: string) => {
    if (!isSideOpen) {
      setIsSideOpen(true);
      getReplies(parent_id);
      setRepliesPayload({ content: "", parent_id: parent_id });
    }
  };

  const handlePostReplies = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postReplies(repliesPayload);
      if (response.data) {
        handleApiMessage(response?.data);
        setRepliesPayload((prev) => ({ ...prev, content: "" }));
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

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
    <div className="w-full">
      <h1 className="text-4xl">Scoops</h1>
      <div className="w-full grid grid-cols-2 gap-x-2 py-2">
        <div className="w-full h-[calc(100vh-100px)] flex flex-col items-start space-y-4 pb-2 overflow-y-auto">
          {isLoadingScoops ? (
            <LoadingScreen />
          ) : scoops?.data ? (
            scoops?.data?.map(
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
                  name={author.username}
                  content={content}
                  date={created_at}
                  image={"/public/assets/images/profile_pic.jpg"}
                  likeCount={like_count}
                  isLiked={is_liked}
                  repliesCount={replies_count}
                  handleReplies={handleDisplayReplies}
                  handleLike={handleLike}
                />
              ),
            )
          ) : (
            <EmptyScreen />
          )}
        </div>

        {isSideOpen && (
          <SideContainer title="Replies" handleClose={handleisSideOpen}>
            <div className="w-full h-[350px] flex flex-col items-center space-y-2 overflow-y-auto">
              {isLoadingAllReplies || isFetchingAllReplies ? (
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
                      name={author.username}
                      content={content}
                      date={created_at}
                      image={"/public/assets/images/profile_pic.jpg"}
                      likeCount={like_count}
                      isLiked={is_liked}
                      repliesCount={replies_count}
                      handleReplies={handleDisplayReplies}
                      handleLike={handleLike}
                    />
                  ),
                )
              ) : (
                <EmptyScreen />
              )}
            </div>

            <form onSubmit={handlePostReplies}>
              <div className="w-full absolute bottom-0 left-0 flex items-end">
                <Input
                  name="Replies"
                  className="w-9/10 h-10"
                  type="text"
                  value={repliesPayload.content}
                  onChange={(e) => {
                    setRepliesPayload((prev) => ({
                      content: e.target.value,
                      parent_id: prev.parent_id,
                    }));
                  }}
                  placeholder="What's on your mind ?"
                />
                <Button
                  type="submit"
                  disabled={isPostingReplies || repliesPayload.content === ""}
                  className="flex-1 h-10"
                >
                  {isPostingReplies ? <Loader /> : <SendHorizontal />}
                </Button>
              </div>
            </form>
          </SideContainer>
        )}
      </div>

      {isDialogOpen && (
        <Dialog handleClose={handleisDialogOpen} title="Post Scoops">
          <CreateScoopsForm handleClose={handleisDialogOpen} />
        </Dialog>
      )}

      <Button
        onClick={handleisDialogOpen}
        className="w-auto absolute right-10 bottom-10"
      >
        <div className="flex items-center space-x-2 text-3xl">
          <Edit /> <p>Post Scoops</p>
        </div>
      </Button>
    </div>
  );
}
