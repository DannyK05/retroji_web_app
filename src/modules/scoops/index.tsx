import { useRef, useState } from "react";
import { Edit } from "lucide-react";

import Button from "../../components/common/button";
import Dialog from "../../components/common/dialog";
import CreateScoopsForm from "./components/CreateScoopsForm";
import ScoopCard from "./components/ScoopCard";

import {
  useGetAllScoopsQuery,
  useLikeScoopsMutation,
} from "../../store/api/scoops";
import LoadingScreen from "../../components/common/loading-screen";
import EmptyScreen from "../../components/common/empty-screen";
import RepliesSection from "../../components/core/replies-section";
import { useHandleApiMessage } from "../../components/common/message-banner/hooks";
import { TPostScoopsDto } from "../../store/types/scoops";
import { TErrorResponse } from "../../store/types/generic";

export default function Scoop() {
  const { data: scoops, isLoading: isLoadingScoops } = useGetAllScoopsQuery();

  const [likeScoops] = useLikeScoopsMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const [repliesPayload, setRepliesPayload] = useState<TPostScoopsDto>({
    content: "",
    parent_id: "",
  });

  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const previousScrollRef = useRef(0);

  const handleisSideOpen = () => {
    setIsSideOpen((prev) => !prev);
  };

  const handleisDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleDisplayReplies = (parent_id: string) => {
    if (!isSideOpen) {
      setIsSideOpen(true);
      setRepliesPayload({ content: "", parent_id: parent_id });
    }
  };

  const handleRepliesPayload = (content: string, parent_id?: string) => {
    setRepliesPayload((prev) => ({
      content: content !== undefined ? content : prev.content,
      parent_id: parent_id ? parent_id : prev.parent_id,
    }));
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
    <div className="w-full pt-2">
      <div className="w-full flex items-center justify-between border-b py-1 lg:border-b-0">
        <h1 className="text-4xl">Scoops</h1>{" "}
        <Button onClick={handleisDialogOpen} className="w-auto h-10 lg:hidden">
          <div className="flex items-center space-x-2 text-2xl">
            <Edit /> <p>Post Scoops</p>
          </div>
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 gap-x-2 py-2 lg:grid-cols-2">
        <div
          onScroll={(e) => {
            const currentScroll = e.currentTarget.scrollTop;
            if (isSideOpen && currentScroll > previousScrollRef.current + 10) {
              setIsSideOpen(false);
            }
            previousScrollRef.current = currentScroll;
          }}
          className="w-full h-[calc(100vh-122px)] flex flex-col items-start space-y-4 pb-2 overflow-y-auto lg:h-[calc(100vh-120px)]"
        >
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
                  className={
                    isSideOpen && repliesPayload.parent_id !== id
                      ? "opacity-40"
                      : ""
                  }
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
          <RepliesSection
            repliesPayload={repliesPayload}
            handleRepliesPayload={handleRepliesPayload}
            handleClose={handleisSideOpen}
          />
        )}
      </div>

      {isDialogOpen && (
        <Dialog handleClose={handleisDialogOpen} title="Post Scoops">
          <CreateScoopsForm handleClose={handleisDialogOpen} />
        </Dialog>
      )}

      <Button
        onClick={handleisDialogOpen}
        className="hidden w-auto absolute right-10 bottom-10 lg:block"
      >
        <div className="flex items-center space-x-2 text-3xl">
          <Edit /> <p>Post Scoops</p>
        </div>
      </Button>
    </div>
  );
}
