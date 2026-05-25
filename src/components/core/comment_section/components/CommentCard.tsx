import { useMemo, useState } from "react";
import { Loader, Trash2Icon } from "lucide-react";

import { getRelativeTime, getUserData } from "../../../../lib/helpers";
import { useDeleteCommentMutation } from "../../../../store/api/snapz";

import ConfirmationDialog from "../../confirmation-dialog";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const handleIsDialogOpen = () => setIsDialogOpen((prev) => !prev);
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
                onClick={handleIsDialogOpen}
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

      <ConfirmationDialog
        message="Are you sure you want to delete this comment ?"
        isOpen={isDialogOpen}
        handleClose={handleIsDialogOpen}
        handleAction={handleDeleteComment}
        isLoading={isLoading}
      />
    </>
  );
}
