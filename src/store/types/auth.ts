export type TAuthState = { user: TUser | null };
export type TUser = { username: string };

export type TSignupDto = {username: string; email: string; password: string;}

export type TSignupResponse = {}

export type TLoginDto = {username:string; password: string;}

export type TLoginResponse = {username:string; password: string;}