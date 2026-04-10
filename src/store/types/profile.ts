import type { TUser } from "./auth";
import type { TApiResponse } from "./generic";

export type TProfile = {
  user: TUser;
  id: string;
  image: File;
  created_at: Date;
  updated_at: Date;
};

export type TProfileResponse = TApiResponse<{ profile: TProfile }>;

export type TUpdateUserProfileDto = {
  user_id: string;
  username: string;
  image: File;
};

export type TFollowUserDto = { user_id: string };
