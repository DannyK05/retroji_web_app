import { useState } from "react";
import { SideContainer } from "../../components/common/side-container";
import { useGetAllSnapzQuery } from "../../store/api/snapz";
import SnapzCard from "./components/SnapzCard";
// import { scoops } from "./data";

export default function Snapz() {
  const { data: snapz, isLoading } = useGetAllSnapzQuery();
  const [isSideOpen, setIsSideOpen] = useState(false);

  const handleisSideOpen = () => {
    setIsSideOpen((prev) => !prev);
  };
  const handleDisplayComments = () => {
    setIsSideOpen(true);
    console.log("kk");
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl">Snapz</h1>
      <div className="w-full grid grid-cols-2 gap-x-4 py-2">
        <div className="w-full flex flex-col h-[calc(100vh-80px)] pb-2 items-start space-y-4 overflow-y-auto">
          {isLoading
            ? "..."
            : snapz?.data.map(
                (
                  {
                    author,
                    created_at,
                    image,
                    caption,
                    like_count,
                    comment_count,
                  },
                  index,
                ) => (
                  <SnapzCard
                    key={index}
                    name={author.toString()}
                    date={created_at}
                    image={image}
                    caption={caption}
                    handleComments={handleDisplayComments}
                    like_count={like_count}
                    comment_count={comment_count}
                  />
                ),
              )}
        </div>

        {isSideOpen && (
          <SideContainer title="Comments" handleClose={handleisSideOpen}>
            <div>KKKK</div>
          </SideContainer>
        )}
      </div>
    </div>
  );
}
