import { useState, ReactNode } from "react";
import { ApiMessageContext } from "./context";
import type {
  TApiResponse,
  TErrorResponse,
} from "../../../store/types/generic";

export function ApiMessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [code, setCode] = useState<number | null>(null);

  const handleApiMessage = (response: TApiResponse<unknown>) => {
    setMessage(response.message);
    setCode(200);

    setTimeout(() => {
      setMessage(null);
      setCode(null);
    }, 5000);
  };

  const handleErrorMessage = (err: TErrorResponse) => {
    if (err.data.message) {
      setMessage(err.data.message);
    } else {
      setMessage("An error occurred");
    }

    setCode(err.status);

    setTimeout(() => {
      setMessage(null);
      setCode(null);
    }, 5000);
  };

  const handleMessage = (message: string) => {
    setMessage(message);

    setCode(0);

    setTimeout(() => {
      setMessage(null);
      setCode(null);
    }, 5000);
  };

  const clearMessage = () => setMessage(null);

  return (
    <ApiMessageContext.Provider
      value={{
        message,
        handleApiMessage,
        handleErrorMessage,
        handleMessage,
        clearMessage,
        code,
      }}
    >
      {children}
    </ApiMessageContext.Provider>
  );
}
