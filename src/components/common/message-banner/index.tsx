import { CheckCircle, CrossIcon } from "lucide-react";
import { useHandleApiMessage } from "./hooks";

export default function MessageBanner() {
  const { message, code } = useHandleApiMessage();
  const isError = code && code >= 400;
  return (
    <div
      className={`${!message && "hidden"} ${
        isError ? "shadow-red-200" : "shadow-green-200"
      } fixed top-0 right-0 flex items-center space-x-1 border p-1 shadow-lg`}
    >
      {isError ? (
        <CrossIcon className="text-red-500" />
      ) : (
        <CheckCircle className="text-green-500" />
      )}
      <p className="text-2xl">{message}</p>
    </div>
  );
}
