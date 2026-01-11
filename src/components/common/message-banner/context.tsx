import { createContext, useState, ReactNode } from "react";
import type {
  TApiResponse,
  TErrorResponse,
} from "../../../store/types/generic";
import type { TApiMessageContextType } from "./types";

export const ApiMessageContext = createContext<
  TApiMessageContextType | undefined
>(undefined);

export function ApiMessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [code, setCode] = useState<number | null>(null);

  const handleApiMessage = (response: TApiResponse<any>) => {
    setMessage(response.message);
    setCode(response.status);

    setTimeout(() => {
      setMessage(null);
      setCode(null);
    }, 3000);
  };

  const handleErrorMessage = (err: TErrorResponse) => {
    if (err.message) {
      setMessage(err.message);
    } else {
      setMessage("An error occurred");
    }

    setCode(err.status ?? 400);

    setTimeout(() => {
      setMessage(null);
      setCode(null);
    }, 3000);
  };

  const clearMessage = () => setMessage(null);

  return (
    <ApiMessageContext.Provider
      value={{
        message,
        handleApiMessage,
        handleErrorMessage,
        clearMessage,
        code,
      }}
    >
      {children}
    </ApiMessageContext.Provider>
  );
}
