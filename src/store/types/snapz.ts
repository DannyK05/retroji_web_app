import { TApiResponse } from "./generic";

export type TSnapz = {
  id: string;
  image: string;
  caption: string;
  author: number;
  like_count: number;
  comment_count: number;
  created_at: Date;
  updated_at: Date;
};

export type TComment = {
  author: number;
  content: string;
  snapz: string;
  created_at: Date;
};

export type TGetAllSnapzResponse = TApiResponse<TSnapz[]>;

export type TPostSnapzData = { caption: string; image: File[] };
export type TPostSnapzResponse = TApiResponse<TSnapz>;

export type TGetSnapzByIdData = { snapz_id: string };
export type TGetSnapzByIdResponse = TApiResponse<TSnapz>;

export type TGetAllCommentsBySnapzIdData = { snapz_id: string };
export type TGetAllCommentsBySnapzIdResponse = TApiResponse<TComment[]>;

export type TPostCommentData = { content: string; snapz_id: string };
export type TPostCommentResponse = TApiResponse<TComment>;

export type TLikeData = { snapz_id: string };
export type TLikeResponse = TApiResponse<void>;
