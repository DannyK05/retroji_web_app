import type { TApiResponse } from "./generic";
import type { TProfile } from "./profile";
import type { TScoops } from "./scoops";
import type { TComment, TSnapz } from "./snapz";

export type TSearchResponse = TApiResponse<{
  snapz: TSnapz[];
  scoops: TScoops[];
  comments: TComment[];
  profiles: TProfile[];
}>;
