import type { TUser } from "./auth";
import type { TApiResponse } from "./generic";

export type TScoops = {
  id: string;
  author: TUser;
  content: string;
  parent: string;
  replies: TScoops[] | null;
  is_liked: boolean;
  like_count: number;
  replies_count: number;
  created_at: Date;
  updated_at: Date;
};

export type TGetAllScoopsResponse = TApiResponse<TScoops[]>;

export type TPostScoopsDto = { content: string; parent_id?: string };
export type TPostScoopsResponse = TApiResponse<{ scoops: TScoops }>;

export type TLikeScoopsDto = { scoop_id: string };
export type TLikeScoopsResponse = TApiResponse<{ message: string }>;

export type TDeleteScoopsDto = { scoops_id: string };
export type TDeleteScoopsResponse = TApiResponse<void>;
