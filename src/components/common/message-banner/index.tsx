import { CheckCircle2, InfoIcon, XIcon } from "lucide-react";
import { useHandleApiMessage } from "./hooks";

export default function MessageBanner() {
  const { message, code, clearMessage } = useHandleApiMessage();

  return (
    <div
      onClick={clearMessage}
      className={`${!message ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"} ${
        code &&
        (code >= 400
          ? "shadow-red-200"
          : code >= 200 && code < 300
            ? "shadow-green-200"
            : "")
      } fixed top-0 right-0 z-100 flex items-center space-x-1 border px-1 shadow-lg bg-white cursor-pointer transition-all duration-500`}
    >
      {code &&
        (code >= 400 ? (
          <XIcon className="text-red-500" />
        ) : code >= 200 && code < 300 ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <InfoIcon className="size-2" />
        ))}
      <p className="text-2xl">{message}</p>
    </div>
  );
}
