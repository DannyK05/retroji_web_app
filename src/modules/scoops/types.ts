export type ScoopCardProps = {
  id: string;
  userId: number;
  className?: string;
  name: string;
  image: string;
  date: Date;
  content: string;
  likeCount: number;
  repliesCount: number;
  isLiked: boolean;
  handleReplies: (parentId: string) => void;
  handleLike: (id: string) => void;
};

export type CreateScoopsFormProps = {
  handleClose: () => void;
};
