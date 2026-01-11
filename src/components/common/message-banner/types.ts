import type {
  TApiResponse,
  TErrorResponse,
} from "../../../store/types/generic";

export type TMonitoredStatusCodes = 200 | 201 | number;

export type TApiMessageContextType = {
  message: string | null;
  code: number | null;
  handleApiMessage: (response: TApiResponse<any>) => void;
  handleErrorMessage: (err: TErrorResponse) => void;
  clearMessage: () => void;
};
