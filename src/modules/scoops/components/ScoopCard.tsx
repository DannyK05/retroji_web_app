import { useState } from "react";
import { Link } from "react-router";
import { Diamond, HeartIcon, Trash2Icon } from "lucide-react";
import { twJoin, twMerge } from "tailwind-merge";

import { getRelativeTime, getUserData } from "../../../lib/helpers";

import { useDeleteScoopsMutation } from "../../../store/api/scoops";

import ConfirmationDialog from "../../../components/core/confirmation-dialog";

import type { TUser } from "../../../store/types/auth";
import type { ScoopCardProps } from "../types";

export default function ScoopCard({
  id,
  userId,
  className,
  image,
  name,
  date,
  content,
  likeCount,
  isLiked,
  repliesCount,
  handleReplies,
  handleLike,
}: ScoopCardProps) {
  const [deleteScoops, { isLoading }] = useDeleteScoopsMutation();

  const user: TUser = getUserData();
  const isUserScoops = user.id === userId;

  const [clickLiked, setClickedLiked] = useState(isLiked ?? false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIsDialogOpen = () => setIsDialogOpen((prev) => !prev);
  const handleDeleteScoops = async () => {
    await deleteScoops({ scoops_id: id });
  };

  return (
    <>
      <div
        className={twMerge(
          "flex items-start w-full p-1 text-3xl transition-opacity duration-300",
          className,
        )}
      >
        <div className="h-23 flex flex-col items-center border border-r-0">
          <img className="h-19 object-cover" src={image} alt={name} />
          <span className="w-full flex-1 text-center text-lg text-white bg-black">
            Scoop
          </span>
        </div>

        <div className="w-full flex min-h-23 flex-col items-start space-y-1 border">
          <div className="flex w-full items-center justify-between text-xl text-white bg-black px-1">
            <p>
              <Link
                className="text-white hover:underline"
                to={`/profile/${userId}`}
              >
                {name}
              </Link>
            </p>

            <div className="flex items-center space-x-2">
              <span>{getRelativeTime(date)}</span>

              {isUserScoops && (
                <button
                  onClick={handleIsDialogOpen}
                  className="cursor-pointer lg:hover:text-red-500 active:text-red-500"
                  title="More"
                  type="button"
                >
                  <Trash2Icon className="size-4" />
                </button>
              )}
            </div>
          </div>

          <p className="text-2xl px-2">{content}</p>

          <div className="w-full flex items-center space-x-4 px-4 border-t">
            <span
              onClick={() => {
                setClickedLiked((prev) => !prev);
                handleLike(id);
              }}
              className={twJoin(
                (clickLiked || isLiked) && "text-red-600",
                "flex items-center space-x-1 cursor-pointer lg:hover:text-[var(--retro-blue)] active:text-[var(--retro-blue)] active:scale-110",
              )}
            >
              <HeartIcon className="size-5" />{" "}
              <span className="text-lg">{likeCount}</span>
            </span>

            <span
              onClick={() => handleReplies(id)}
              className="flex items-center space-x-1 cursor-pointer lg:hover:text-[var(--retro-blue)] active:text-[var(--retro-blue)] active:scale-110"
            >
              <Diamond className="size-5" />
              <span className="text-lg">{repliesCount}</span>
            </span>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        message="Are you sure you want to delete this scoop ?"
        isOpen={isDialogOpen}
        handleClose={handleIsDialogOpen}
        handleAction={handleDeleteScoops}
        isLoading={isLoading}
      />
    </>
  );
}
