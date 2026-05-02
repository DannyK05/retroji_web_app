import { useMemo, useState } from "react";
import SnapzCard from "../../../../modules/snapz/components/SnapzCard";
import { AllTabProps } from "../types";
import ScoopCard from "../../../../modules/scoops/components/ScoopCard";
import CommentCard from "../../comment_section/components/CommentCard";
import { TPostScoopsDto } from "../../../../store/types/scoops";
import { TPostCommentDto } from "../../../../store/types/snapz";
import { useLikeSnapzMutation } from "../../../../store/api/snapz";
import { useLikeScoopsMutation } from "../../../../store/api/scoops";
import { useHandleApiMessage } from "../../../common/message-banner/hooks";
import { TErrorResponse } from "../../../../store/types/generic";
import CommentsSection from "../../comment_section";
import RepliesSection from "../../replies-section";
import EmptyScreen from "../../../common/empty-screen";
import ProfileCard from "../../../../modules/search/components/ProfileCard";

export default function AllTab({ data, handleNav }: AllTabProps) {
  const [likeSnapz] = useLikeSnapzMutation();
  const [likeScoops] = useLikeScoopsMutation();

  const { handleErrorMessage, handleApiMessage } = useHandleApiMessage();

  const previewSnapz = useMemo(() => {
    return data.snapz.slice(0, 3);
  }, [data.snapz]);

  const previewScoops = useMemo(() => {
    return data.scoops.slice(0, 3);
  }, [data.scoops]);

  const previewProfiles = useMemo(() => {
    return data.profiles.slice(0, 3);
  }, [data.profiles]);

  const previewComments = useMemo(() => {
    return data.comments.slice(0, 3);
  }, [data.comments]);

  const isEmpty =
    previewComments.length === 0 &&
    previewProfiles.length === 0 &&
    previewScoops.length === 0 &&
    previewSnapz.length === 0;

  const [repliesPayload, setRepliesPayload] = useState<TPostScoopsDto>({
    content: "",
    parent_id: "",
  });

  const [commentPayload, setCommentPayload] = useState<TPostCommentDto>({
    content: "",
    snapz_id: "",
  });

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const handleCommentPayload = (content: string, snapz_id?: string) => {
    setCommentPayload((prev) => ({
      content: content !== undefined ? content : prev.content,
      snapz_id: snapz_id ? snapz_id : prev.snapz_id,
    }));
  };

  const handleRepliesPayload = (content: string, parent_id?: string) => {
    setRepliesPayload((prev) => ({
      content: content !== undefined ? content : prev.content,
      parent_id: parent_id ? parent_id : prev.parent_id,
    }));
  };

  const handleDisplayReplies = (parent_id: string) => {
    if (!isRepliesOpen) {
      setIsRepliesOpen(true);
      setRepliesPayload({ content: "", parent_id: parent_id });
    }
  };

  const handleLikeScoops = async (scoop_id: string) => {
    try {
      const response = await likeScoops({ scoop_id });
      if (response.data) {
        handleApiMessage(response?.data);
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleLikeSnapz = async (snapz_id: string, e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await likeSnapz({ snapz_id });
      if (response.data) {
        handleApiMessage(response?.data);
      }
    } catch (error) {
      handleErrorMessage(error as TErrorResponse);
    }
  };

  const handleDisplayComments = (snapz_id: string) => {
    if (!isCommentsOpen) {
      setIsCommentsOpen(true);
      setCommentPayload({ content: "", snapz_id: snapz_id });
    }
  };

  return isEmpty ? (
    <div className="w-full flex items-center justify-center lg:h-[500px]">
      <EmptyScreen />
    </div>
  ) : (
    <div className="w-full grid grid-cols-2 gap-x-1">
      <div className="w-full h-[calc(100vh-190px)] col-span-2 flex flex-col items-center space-y-2 overflow-y-auto lg:col-span-1 lg:h-[450px]">
        {previewProfiles.length !== 0 && (
          <>
            <p className="w-full px-2 mb-4 text-3xl border">Profile</p>
            <div className="flex flex-col items-start space-y-4">
              {previewProfiles.map(({ id, user }) => (
                <ProfileCard
                  imageUrl="/assets/images/profile_pic.jpg"
                  key={id}
                  userId={user.id}
                  username={user.username}
                  followers={user.followers}
                  following={user.following}
                />
              ))}
              <span
                className="text-2xl cursor-pointer active:text-[var(--retro-blue)] active:underline lg:hover:underline lg:hover:text-[var(--retro-blue)]"
                onClick={() => handleNav("profiles")}
              >
                See more...
              </span>
            </div>
          </>
        )}

        {previewSnapz.length !== 0 && (
          <>
            <p className="w-full px-2 mb-4 text-3xl border">Snapz</p>
            <div className="flex flex-col items-start space-y-4">
              {previewSnapz.map(
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
                    className={
                      isCommentsOpen && commentPayload.snapz_id !== id
                        ? "opacity-40"
                        : ""
                    }
                    name={author.username}
                    userId={author.id}
                    date={created_at}
                    images={images}
                    caption={caption}
                    like_count={like_count}
                    isLiked={is_liked}
                    comment_count={comment_count}
                    handleComments={handleDisplayComments}
                    handleLike={handleLikeSnapz}
                  />
                ),
              )}
              <span
                className="w-full text-2xl text-center cursor-pointer active:text-[var(--retro-blue)] active:underline lg:hover:underline lg:hover:text-[var(--retro-blue)]"
                onClick={() => handleNav("snapz")}
              >
                See more...
              </span>
            </div>
          </>
        )}

        {previewScoops.length !== 0 && (
          <>
            <p className="w-full px-2 mb-4 text-3xl border">Scoops</p>
            <div className="w-full flex flex-col items-start space-y-4">
              {previewScoops.map(
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
                      isRepliesOpen && repliesPayload.parent_id !== id
                        ? "opacity-50"
                        : ""
                    }
                    userId={author.id}
                    name={author.username}
                    content={content}
                    date={created_at}
                    image={"/public/assets/images/profile_pic.jpg"}
                    likeCount={like_count}
                    isLiked={is_liked}
                    repliesCount={replies_count}
                    handleReplies={handleDisplayReplies}
                    handleLike={handleLikeScoops}
                  />
                ),
              )}
              <span
                className="w-full text-2xl text-center cursor-pointer active:text-[var(--retro-blue)] active:underline lg:hover:underline lg:hover:text-[var(--retro-blue)]"
                onClick={() => handleNav("scoops")}
              >
                See more...
              </span>
            </div>
          </>
        )}

        {previewComments.length !== 0 && (
          <>
            <p className="w-full px-2 mb-4 text-3xl border">Comments</p>
            <div className="w-full flex flex-col items-start space-y-4">
              {previewComments.map(({ content, author, created_at }, index) => (
                <CommentCard
                  key={index}
                  content={content}
                  author={author}
                  createdAt={created_at}
                />
              ))}
              <span
                className="w-full text-2xl text-center cursor-pointer active:text-[var(--retro-blue)] active:underline lg:hover:underline lg:hover:text-[var(--retro-blue)]"
                onClick={() => handleNav("comments")}
              >
                See more...
              </span>
            </div>
          </>
        )}
      </div>

      <div>
        <CommentsSection
          isOpen={isCommentsOpen}
          handleClose={() => setIsCommentsOpen(false)}
          commentPayload={commentPayload}
          handleCommentPayload={handleCommentPayload}
        />

        <RepliesSection
          isOpen={isRepliesOpen}
          handleClose={() => setIsRepliesOpen(false)}
          repliesPayload={repliesPayload}
          handleRepliesPayload={handleRepliesPayload}
        />
      </div>
    </div>
  );
}
