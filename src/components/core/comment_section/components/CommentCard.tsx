import { useMemo } from "react";
import { Loader, Trash2Icon } from "lucide-react";

import { getRelativeTime, getUserData } from "../../../../lib/helpers";
import { useDeleteCommentMutation } from "../../../../store/api/snapz";

import type { TUser } from "../../../../store/types/auth";
import type { CommentCardProps } from "../types";

export default function CommentCard({
  id,
  author,
  createdAt,
  content,
}: CommentCardProps) {
  const user: TUser = useMemo(() => getUserData(), []);
  const isUserSnapz = user.id === author.id;

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    await deleteComment({ comment_id: id });
  };
  return (
    <>
      <div className="w-full h-auto flex flex-col items-start p-1 border">
        <div className="w-full flex items-center justify-between text-2xl border-b">
          <p>{author.username} says</p>

          <div className="flex items-center space-x-2">
            <span>{getRelativeTime(createdAt)}</span>

            {isUserSnapz && (
              <button
                onClick={handleDeleteComment}
                className="cursor-pointer lg:hover:text-red-500 active:text-red-500"
                title="Delete"
                type="button"
              >
                {isLoading ? (
                  <Loader className="cursor-not-allowed" />
                ) : (
                  <Trash2Icon className="size-4" />
                )}
              </button>
            )}
          </div>
        </div>
        <p className="text-3xl pt-2 break-all whitespace-normal">{content}</p>
      </div>
    </>
  );
}
