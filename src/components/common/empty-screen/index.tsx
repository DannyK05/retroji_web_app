import { SearchIcon } from "lucide-react";

export default function EmptyScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center pb-5">
      <div className="flex flex-col items-center space-y-2">
        <SearchIcon className="size-40" />
        <p className="text-4xl">Nothing to see here</p>
      </div>
    </div>
  );
}
