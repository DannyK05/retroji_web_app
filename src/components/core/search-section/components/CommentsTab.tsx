import EmptyScreen from "../../../common/empty-screen";
import CommentCard from "../../comment_section/components/CommentCard";
import { CommentsTabProps } from "../types";

export default function CommentsTab({ data }: CommentsTabProps) {
  return (
    <div className="w-full flex flex-col items-center space-y-3 py-2 px-1 lg:max-h-[450px] lg:px-3 lg:overflow-y-auto">
      {data && data.length > 0 ? (
        data?.map(({ content, author, created_at }, index) => (
          <CommentCard
            key={index}
            content={content}
            author={author}
            createdAt={created_at}
          />
        ))
      ) : (
        <EmptyScreen />
      )}
    </div>
  );
}
