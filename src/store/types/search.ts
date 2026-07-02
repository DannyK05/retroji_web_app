import type { TApiResponse, TPaginatedResponse } from "./generic";
import type { TProfile } from "./profile";
import type { TScoops } from "./scoops";
import type { TComment, TSnapz } from "./snapz";

export type TSearchResponse = TApiResponse<{
  snapz: TPaginatedResponse<TSnapz[]>;
  scoops: TPaginatedResponse<TScoops[]>;
  comments: TPaginatedResponse<TComment[]>;
  profiles: TPaginatedResponse<TProfile[]>;
}>;
