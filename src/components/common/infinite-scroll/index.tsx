import InfiniteScroll from "react-infinite-scroll-component";
import { twMerge } from "tailwind-merge";

type InfiniteScrollContainerProps = {
  children: React.ReactNode;
  className?: string;
  handleNext: () => void;
  hasMore: boolean;
  dataLength: number;
};

export function InfiniteScrollContainer({
  children,
  className,
  handleNext,
  hasMore,
  dataLength,
}: InfiniteScrollContainerProps) {
  return (
    <InfiniteScroll
      className={twMerge("w-full", className)}
      dataLength={dataLength ?? 0}
      next={handleNext}
      hasMore={hasMore}
      loader={<div className="spinner-loader"></div>}
    >
      {children}
    </InfiniteScroll>
  );
}
