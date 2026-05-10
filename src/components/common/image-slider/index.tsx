import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type ImageSliderProps = { children: React.ReactNode };

export default function ImageSlider({ children }: ImageSliderProps) {
  return (
    <div className="relative w-full [&_.swiper-button-next]:text-[var(--retro-blue)] [&_.swiper-button-prev]:text-[var(--retro-blue)] [&_.swiper-pagination-bullet-active]:bg-[var(--retro-blue)] [&_.swiper-scrollbar-drag]:bg-[var(--retro-blue)]">
      <Swiper
        autoHeight
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {children}
      </Swiper>
    </div>
  );
}
