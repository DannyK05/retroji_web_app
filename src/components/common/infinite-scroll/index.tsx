import InfiniteScroll from "react-infinite-scroll-component";

type InfiniteScrollContainerProps = {
  children: React.ReactNode;
  handleNext: () => void;
  hasMore: boolean;
  dataLength: number;
};

export function InfiniteScrollContainer({
  children,
  handleNext,
  hasMore,
  dataLength,
}: InfiniteScrollContainerProps) {
  return (
    <InfiniteScroll
      className="w-full"
      dataLength={dataLength ?? 0}
      next={handleNext}
      hasMore={hasMore}
      loader={<div className="spinner-loader"></div>}
    >
      {children}
    </InfiniteScroll>
  );
}
