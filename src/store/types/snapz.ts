import { TUser } from "./auth";
import { TApiResponse } from "./generic";

export type TSnapzImage = {
  snapz: string;
  image: string;
};

export type TSnapz = {
  id: string;
  images: TSnapzImage[];
  caption: string;
  author: TUser;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  created_at: Date;
  updated_at: Date;
};

export type TComment = {
  id: string;
  author: TUser;
  content: string;
  snapz: string;
  created_at: Date;
};

export type TGetAllSnapzResponse = TApiResponse<TSnapz[]>;

export type TPostSnapzDto = { caption: string; images: File[] };
export type TPostSnapzResponse = TApiResponse<TSnapz>;

export type TGetSnapzByIdDto = { snapz_id: string };
export type TGetSnapzByIdResponse = TApiResponse<TSnapz>;

export type TGetAllCommentsBySnapzIdDto = { snapz_id: string };
export type TGetAllCommentsBySnapzIdResponse = TApiResponse<TComment[]>;

export type TPostCommentDto = { content: string; snapz_id: string };
export type TPostCommentResponse = TApiResponse<TComment>;

export type TLikeSnapzDto = { snapz_id: string };
export type TLikeSnapzResponse = TApiResponse<void>;

export type TDeleteSnapzDto = { snapz_id: string };
export type TDeleteSnapzResponse = TApiResponse<void>;

export type TDeleteCommentDto = { comment_id: string };
export type TDeleteCommentResponse = TApiResponse<void>;