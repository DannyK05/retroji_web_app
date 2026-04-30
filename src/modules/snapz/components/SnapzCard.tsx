import { useState } from "react";
import { DiamondIcon, ThumbsUpIcon } from "lucide-react";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

import Button from "../../../components/common/button";

import type { SnapzProps } from "../types";
import { getRelativeTime } from "../../../lib/helpers";
import ImageSlider from "../../../components/common/image-slider";
import { PopupDialog } from "../../../components/common/dialog";
import { TSnapzImage } from "../../../store/types/snapz";

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
  const [clickLiked, setClickedLiked] = useState(isLiked ?? false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<TSnapzImage[]>([]);

  const handleIsDialogOpen = () => setIsDialogOpen((prev) => !prev);

  const handleSelectedImages = (images: TSnapzImage[]) => {
    setSelectedImages(images);
    setIsDialogOpen((prev) => !prev);
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
          <span>{getRelativeTime(date)}</span>
        </div>
        <div className="w-full px-2 flex-1 min-h-0">
          {images.length <= 1 ? (
            <img
              onClick={() => handleSelectedImages(images)}
              className="w-full max-h-[500px] object-fit"
              src={images[0]?.image}
              alt="Scoop pic"
            />
          ) : (
            <ImageSlider>
              {images.map((image, index) => (
                <div
                  onClick={() => handleSelectedImages(images)}
                  className="aspect-[4/3]"
                >
                  <img
                    className="w-full h-full object-cover"
                    key={index}
                    src={image.image}
                    alt={`Snapz pic ${index}`}
                  />
                </div>
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
        isOpen={isDialogOpen}
        handleClose={handleIsDialogOpen}
      >
        {selectedImages.length <= 1 ? (
          <img
            className="max-h-[560px] object-fit"
            src={selectedImages[0]?.image}
            alt="Scoop pic"
          />
        ) : (
          <ImageSlider>
            {selectedImages.map((image, index) => (
              <div className="bg-white flex items-center justify-center">
                <img
                  className="max-w-[510px] object-cover"
                  key={index}
                  src={image.image}
                  alt={`Snapz pic ${index}`}
                />
              </div>
            ))}
          </ImageSlider>
        )}
      </PopupDialog>
    </>
  );
}
