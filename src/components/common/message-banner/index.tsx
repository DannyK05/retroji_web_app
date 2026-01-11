import { CheckCircle2, XIcon } from "lucide-react";
import { useHandleApiMessage } from "./hooks";

export default function MessageBanner() {
  const { message, code, clearMessage } = useHandleApiMessage();
  const isError = code && code >= 400;
  return (
    <div
      onClick={clearMessage}
      className={`${!message && "hidden"} ${
        isError ? "shadow-red-200" : "shadow-green-200"
      } fixed top-0 right-0 flex items-center space-x-1 border px-1 shadow-lg cursor-pointer`}
    >
      {isError ? (
        <XIcon className="text-red-500" />
      ) : (
        <CheckCircle2 className="text-green-500" />
      )}
      <p className="text-2xl">{message}</p>
    </div>
  );
}
