import type { TApiResponse, TAuthApiResponse } from "./generic";

export type TAuthState = { user: TUser | null; tokens: TToken | null };

export type TUser = {
  id: number;
  username: string;
  following: number;
  followers: number;
};

export type TToken = { access: string };

export type TSignupDto = { username: string; email: string; password: string };
export type TSignupResponse = TAuthApiResponse<{ user: TUser }>;

export type TLoginDto = { username: string; password: string };
export type TLoginResponse = TAuthApiResponse<{ user: TUser }>;

export type TLogoutDto = void;
export type TLogoutResponse = { message: string };

export type TIsUsernameTakenResponse = TAuthApiResponse<{
  is_taken: boolean;
}>;

export type TDeleteUserResponse = TApiResponse<void>;
