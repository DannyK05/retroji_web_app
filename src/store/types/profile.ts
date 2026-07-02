import type { TUser } from "./auth";
import type { TApiResponse, TPaginatedApiResponse } from "./generic";
import type { TScoops } from "./scoops";
import type { TComment, TSnapz } from "./snapz";

export type TProfile = {
  user: TUser;
  id: string;
  image: string;
  bio: string;
  is_followed: boolean;
  created_at: Date;
  updated_at: Date;
};

export type TGetUserProfileResponse = TApiResponse<TProfile>;

export type TGetUserSnapzResponse = TPaginatedApiResponse<TSnapz[]>;

export type TGetUserScoopsResponse = TPaginatedApiResponse<TScoops[]>;

export type TGetUserCommentsResponse = TPaginatedApiResponse<TComment[]>;

export type TUpdateUserProfileDto = {
  username?: string;
  bio?: string;
  image?: File;
};

export type TFollowUserDto = { user_id: string };
