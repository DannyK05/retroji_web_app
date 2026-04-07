import { NavLink, Outlet, useNavigate } from "react-router";

import { useLogoutMutation } from "../../store/api/auth";
import { useAppDispatch } from "../../store/hooks";
import { removeCredentials } from "../../store/features/authSlice";

import { useHandleApiMessage } from "../common/message-banner/hooks";
import { getUserData } from "../../lib/helpers";


import Button from "../common/button";
import MessageBanner from "../common/message-banner";

import type { TApiResponse } from "../../store/types/generic";
import type { TUser } from "../../store/types/auth";

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { handleApiMessage } = useHandleApiMessage();
  const user: TUser = getUserData();

  const handleLogout = async () => {
      const response = await logout();
      handleApiMessage(response as TApiResponse<unknown>);
    
    dispatch(removeCredentials());
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <header>
        <h1 className="text-pacifico text-center text-retro-blue text-4xl">
          Retroji
        </h1>
      </header>

      <main className="px-4">
        <MessageBanner />
        <div className="grid grid-cols-6 w-full gap-x-4">
          <div className="hidden flex flex-col space-y-2 col-span-1 fixed lg:flex">
            <nav className="flex flex-col p-2 items-start text-orbitronio text-3xl border">
              <p className="text-4xl w-full border-b-[1px]">getting around</p>
              <NavLink to={"/snapz"}>snapz</NavLink>
              <NavLink to={"/scoops"}>scoops</NavLink>
              <NavLink to={"/profile"}>profile</NavLink>
            </nav>

            <div className="border text-3xl flex flex-col items-start space-y-1 p-1">
              <p className="font-semibold text-4xl">search</p>

              <input
                className="border p-1 "
                title="Search"
                placeholder="Dig it.."
                type="search"
              />

              <Button>search</Button>
            </div>
          </div>

          <div className="px-4 col-span-6 overflow-x-hidden lg:col-start-2 lg:col-end-6">
            <Outlet />
          </div>

          <div className="hidden border fixed right-6 p-2 lg:block">
            <p className="text-vcr border-b-[1px] text-lg">{user.username}</p>
            <button
              type="submit"
              onClick={handleLogout}
              className="text-4xl cursor-pointer text-retro-blue lg:hover:underline"
            >
              logout
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
