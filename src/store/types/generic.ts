export type TApiResponse<T> = { message: string; data: T; status: number };

export type TAuthApiResponse<T> = {
  message: string;
  data: T;
  tokens: { refresh: string; access: string };
  status: number;
};

export type TErrorResponse = { message: string; status: number };
