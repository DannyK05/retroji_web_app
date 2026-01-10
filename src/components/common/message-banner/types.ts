import type { TApiResponse } from "../../../store/types/generic";

export type TMonitoredStatusCodes = 200 | 201 | number;

export type TApiMessageContextType = {
  message: string | null;
  code: number | null;
  handleApiMessage: (response: TApiResponse<any>) => void;
  clearMessage: () => void;
};
