import type { TUser } from "../../../store/types/auth";
import type { TPostScoopsDto } from "../../../store/types/scoops";

export type RepliesSectionProps = {
  repliesPayload: TPostScoopsDto;
  handleRepliesPayload: (content: string, parent_id?: string) => void;
  refetch?: () => void;
  handleClose: () => void;
};

export type RepliesCardProps = {
  author: TUser;
  content: string;
  createdAt: Date;
};

export type PostRepliesFormProps = {
  repliesPayload: TPostScoopsDto;
  handleRepliesPayload: (content: string, parent_id?: string) => void;
  refetch?: () => void;
};
