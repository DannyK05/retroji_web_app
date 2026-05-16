import type { TUser } from "../../store/types/auth";

export type ScoopCardProps = {
  id: string;
  author: TUser;
  className?: string;
  date: Date;
  content: string;
  likeCount: number;
  repliesCount: number;
  isLiked: boolean;
  handleReplies?: (parentId: string) => void;
  handleLike: (id: string) => void;
};

export type CreateScoopsFormProps = {
  handleClose: () => void;
};
