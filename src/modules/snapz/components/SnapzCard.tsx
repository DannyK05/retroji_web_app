import { useMemo, useState } from "react";
import { DiamondIcon, ThumbsUpIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

import { getRelativeTime, getUserData } from "../../../lib/helpers";

import { useDeleteSnapzMutation } from "../../../store/api/snapz";

import Button from "../../../components/common/button";
import ImageSlider from "../../../components/common/image-slider";
import { PopupDialog } from "../../../components/common/dialog";
import ConfirmationDialog from "../../../components/core/confirmation-dialog";

import type { TUser } from "../../../store/types/auth";
import type { SnapzProps } from "../types";
import { SwiperSlide } from "swiper/react";

export default function SnapzCard({
  id,
  userId,
  className,
  name,
  date,
  images,
  caption,
  like_count,
  isLiked,
  comment_count,
  handleComments,
  handleLike,
}: SnapzProps) {
  const user: TUser = useMemo(() => getUserData(), []);

  const [deleteSnapz, { isLoading }] = useDeleteSnapzMutation();

  const isUserSnapz = user.id === userId;

  const [clickLiked, setClickedLiked] = useState(isLiked ?? false);

  const [isPopupDialogOpen, setIsPopupDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const [selectedImages, setSelectedImages] = useState<string>();

  const handleIsPopupDialogOpen = () => setIsPopupDialogOpen((prev) => !prev);

  const handleIsConfirmationDialogOpen = () =>
    setIsConfirmationDialogOpen((prev) => !prev);

  const handleDeleteSnapz = async () => {
    await deleteSnapz({ snapz_id: id });
  };

  const handleSelectedImages = (image: string) => {
    setSelectedImages(image);
    setIsPopupDialogOpen((prev) => !prev);
  };
  return (
    <>
      <div
        className={twMerge(
          "flex w-full flex-col items-start bg-white border transition-opacity duration-300",
          className,
        )}
      >
        <div className="w-full flex items-center text-2xl bg-[var(--retro-blue)] text-white justify-between p-2">
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

            {isUserSnapz && (
              <button
                onClick={handleIsConfirmationDialogOpen}
                className="cursor-pointer lg:hover:text-red-500 active:text-red-500"
                title="Delete"
                type="button"
              >
                <Trash2Icon className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div className="w-full px-2 flex-1 min-h-0">
          {images.length <= 1 ? (
            <img
              onClick={() => handleSelectedImages(images[0]?.image)}
              className="w-full max-h-[400px] object-fit cursor-pointer"
              src={images[0]?.image}
              alt="Scoop pic"
            />
          ) : (
            <ImageSlider>
              {images.map((image, index) => (
                <SwiperSlide
                  key={image.image}
                  onClick={() => handleSelectedImages(image.image)}
                >
                  <img
                    className="w-full max-h-[400px] object-cover cursor-pointer"
                    src={image.image}
                    alt={`Snapz pic ${index}`}
                  />
                </SwiperSlide>
              ))}
            </ImageSlider>
          )}
        </div>

        <p className="w-full p-1 text-3xl border-t mt-1">{caption}</p>

        <div className="w-full grid grid-cols-2 gap-1">
          <Button
            className={twMerge(
              isLiked || clickLiked ? "text-[var(--retro-blue)]" : "",
              "lg:hover:text-white lg:hover:bg-[var(--retro-blue)]",
            )}
            onClick={(e) => {
              setClickedLiked((prev) => !prev);
              handleLike(id, e);
            }}
          >
            <ThumbsUpIcon className="text-inherit" />
            <span className="text-2xl">{like_count}</span>
          </Button>

          <Button onClick={() => handleComments(id)}>
            <DiamondIcon /> <span className="text-2xl">{comment_count}</span>
          </Button>
        </div>
      </div>

      <PopupDialog
        className="lg:w-4/5 lg:h-3/5"
        title="Image"
        isOpen={isPopupDialogOpen}
        handleClose={handleIsPopupDialogOpen}
      >
        {selectedImages && (
          <img
            className="max-h-[450px] object-fit lg:max-h-[560px]"
            src={selectedImages}
            alt="Scoop pic"
          />
        )}
      </PopupDialog>

      <ConfirmationDialog
        message="Are you sure you want to delete this snapz ?"
        isOpen={isConfirmationDialogOpen}
        handleClose={handleIsConfirmationDialogOpen}
        handleAction={handleDeleteSnapz}
        isLoading={isLoading}
      />
    </>
  );
}
