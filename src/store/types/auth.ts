import { TApiResponse } from "./generic";

export type TAuthState = { user: TUser | null };

export type TUser = { id: number; username: string; email: string };

export type TSignupDto = { username: string; email: string; password: string };
export type TSignupResponse = TApiResponse<{ user: TUser }>;

export type TLoginDto = { username: string; password: string };
export type TLoginResponse = TApiResponse<{ user: TUser }>;

export type TLogoutResponse = { message: string; status: number };
