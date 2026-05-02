import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useBlazeSlider } from "./hooks/useBlazeSlider";

type ImageSliderProps = { children: React.ReactNode };

export default function ImageSlider({ children }: ImageSliderProps) {
  const ref = useBlazeSlider(
    {
      all: {
        slidesToShow: 1,
        loop: true,
      },
    },
    children,
  );
  return (
    <div ref={ref} className="blaze-slider">
      <div className="blaze-container relative">
        <div className="blaze-track-container">
          <div className="blaze-track">{children}</div>
        </div>

        <div className="controls w-full -translate-y-40 flex items-center justify-between px-2">
          <button
            type="button"
            className="blaze-prev flex items-center justify-center size-10 text-white bg-white/60 cursor-pointer lg:opacity-40 lg:hover:opacity-100 active:scale-110"
            aria-label="Previous slide"
          >
            <ArrowBigLeft />
          </button>

          <div className="blaze-pagination translate-y-30"></div>

          <button
            type="button"
            className="blaze-next flex items-center justify-center size-10 text-white bg-white/60 cursor-pointer lg:opacity-40 lg:hover:opacity-100 active:scale-110"
            aria-label="Next slide"
          >
            <ArrowBigRight />
          </button>
        </div>
      </div>
    </div>
  );
}
