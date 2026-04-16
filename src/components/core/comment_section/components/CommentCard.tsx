import { getRelativeTime } from "../../../../lib/helpers";
import { CommentCardProps } from "../types";

export default function CommentCard({
  author,
  createdAt,
  content,
}: CommentCardProps) {
  return (
    <div className="w-full flex flex-col items-start p-1 border">
      <div className="w-full flex items-center justify-between text-2xl border-b">
        <p>{author.username} says</p>
        <span>{getRelativeTime(createdAt)}</span>
      </div>
      <p className="text-3xl pt-2">{content}</p>
    </div>
  );
}
