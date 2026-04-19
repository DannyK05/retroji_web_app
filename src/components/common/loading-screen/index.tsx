import { LoadingScreenProps } from "./types";

export default function LoadingScreen({
  message = "Loading",
}: LoadingScreenProps) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-20 flex flex-col items-center space-y-2">
        <div className="loader"></div>
        <p className="text-2xl">{message}</p>
      </div>
    </div>
  );
}
