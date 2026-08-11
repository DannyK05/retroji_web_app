export type TApiResponse<T> = { message: string; data: T };
export type TAuthApiResponse<T> = {
  message: string;
  data: T;
  tokens: { access: string };
};

export type TPaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  data: T;
};
export type TPaginatedApiResponse<T> = TApiResponse<TPaginatedResponse<T>>;
export type TErrorResponse = { data: { message: string }; status: number };

export type TPaginationParams = { page?: number };
