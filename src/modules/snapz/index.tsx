import { useGetAllSnapzQuery } from "../../store/api/snapz";
import SnapzCard from "./component/SnapzCard";
// import { scoops } from "./data";

export default function Snapz() {
  const { data: snapz, isLoading } = useGetAllSnapzQuery();
  return (
    <div>
      <h1 className="text-4xl">Snapz</h1>
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
                  like_count={like_count}
                  comment_count={comment_count}
                />
              ),
            )}
      </div>
    </div>
  );
}
