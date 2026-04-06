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

export type TLikeDto = { snapz_id: string };
export type TLikeResponse = TApiResponse<void>;
