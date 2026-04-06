export type TApiResponse<T> = { message: string; data: T;};

export type TAuthApiResponse<T> = {
  message: string;
  data: T;
  tokens: { access: string };
};

export type TErrorResponse = { message: string; status: number };
