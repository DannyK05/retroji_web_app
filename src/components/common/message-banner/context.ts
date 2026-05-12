import { createContext } from "react";
import type { TApiMessageContextType } from "./types";

export const ApiMessageContext = createContext<
  TApiMessageContextType | undefined
>(undefined);
