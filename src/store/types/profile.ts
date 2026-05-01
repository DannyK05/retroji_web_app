import type { TUser } from "./auth";
import type { TApiResponse } from "./generic";
import type { TScoops } from "./scoops";
import type { TComment, TSnapz } from "./snapz";

export type TProfile = {
  user: TUser;
  id: string;
  image: File;
  bio: string;
  is_followed: boolean;
  created_at: Date;
  updated_at: Date;
};

export type TGetUserProfileResponse = TApiResponse<{ profile: TProfile }>;

export type TGetUserSnapzResponse = TApiResponse<{ snapz: TSnapz[] }>;

export type TGetUserScoopsResponse = TApiResponse<{ scoops: TScoops[] }>;

export type TGetUserCommentsResponse = TApiResponse<{
  comments: TComment[];
}>;

export type TUpdateUserProfileDto = {
  user_id: string;
  username: string;
  image: File;
};

export type TFollowUserDto = { user_id: string };
