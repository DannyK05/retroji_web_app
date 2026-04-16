import type { TUser } from "../../../store/types/auth";
import type { TPostCommentDto } from "../../../store/types/snapz";

export type CommentSectionProps = {
  commentPayload: TPostCommentDto;
  handleCommentPayload: (content: string, snapz_id?: string) => void;
  refetch?: () => void;
  handleClose: () => void;
};

export type CommentCardProps = {
  author: TUser;
  content: string;
  createdAt: Date;
};

export type PostCommentFormProps = {
  commentPayload: TPostCommentDto;
  handleCommentPayload: (content: string, snapz_id?: string) => void;
  refetch?: () => void;
};
