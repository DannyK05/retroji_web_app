export type TApiResponse<T> = { message: string; data: T; status: number };

export type TErrorResponse = { message: string; status: number };
