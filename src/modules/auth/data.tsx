import { TErrorResponse } from "../../store/types/generic";

export const freeServerMessage: TErrorResponse = {
  status: 200,
  data: {
    message:
      "The server may take up to 50 seconds to respond on first request due to free-tier hosting.",
  },
};
