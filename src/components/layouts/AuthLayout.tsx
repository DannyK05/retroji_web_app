import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="w-full h-[100vh] p-2 flex items-center justify-center">
      <div className="w-full flex flex-col border-[1px]  p-4 items-center lg:w-3/5 space-y-4 lg:justify-between lg:flex-row">
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
          <div>
            <h1 className="text-pacifico text-retro-blue text-6xl">Retroji</h1>
            <p className="text-4xl">The nostalgic form of social connection </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 border-l-[1px] pl-2 h-full flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
