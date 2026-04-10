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
import { MenuIcon, XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { handleApiMessage } = useHandleApiMessage();
  const user: TUser = getUserData();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = async () => {
    const response = await logout();
    handleApiMessage(response as TApiResponse<unknown>);

    handleIsNavOpen();
    dispatch(removeCredentials());
    setTimeout(() => navigate("/"), 1000);
  };

  const handleIsNavOpen = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <header className="flex items-center space-x-18 pl-8 pt-2 lg:pl-0 lg:space-x-0 lg:justify-center">
        <button
          onClick={handleIsNavOpen}
          className="self-center justify-self-start lg:hidden"
          title="toggle"
          type="button"
        >
          <MenuIcon className="size-10" />
        </button>
        <h1 className="text-pacifico text-center text-retro-blue text-4xl">
          Retroji
        </h1>
      </header>

      <main className="px-4">
        <MessageBanner />
        <div className="grid grid-cols-6 w-full gap-x-4">
          <div
            className={twMerge(
              !isNavOpen && "hidden",
              "h-full z-50 fixed top-0 left-0 px-2 pt-3 bg-white border-r-1 lg:border-r-0 lg:static lg:block lg:z-10",
            )}
          >
            <div className="flex flex-col space-y-2 col-span-1 lg:flex">
              <button
                onClick={handleIsNavOpen}
                className="self-center justify-self-start lg:hidden"
                title="toggle"
                type="button"
              >
                <XIcon className="size-10" />
              </button>
              <nav className="flex flex-col p-2 items-start text-orbitronio text-3xl border">
                <p className="text-4xl w-full border-b-[1px]">getting around</p>
                <NavLink
                  className="text-retro-link hover:underline"
                  to={"/snapz"}
                >
                  snapz
                </NavLink>
                <NavLink
                  className="text-retro-link hover:underline"
                  to={"/scoops/"}
                >
                  scoops
                </NavLink>
                <NavLink
                  className="text-retro-link hover:underline"
                  to={`/profile/${user.id}`}
                >
                  profile
                </NavLink>
              </nav>

              <div className="hidden border text-3xl flex flex-col items-start space-y-1 p-1 lg:block">
                <p className="font-semibold text-4xl">search</p>

                <input
                  className="border p-1 "
                  title="Search"
                  placeholder="Dig it.."
                  type="search"
                />

                <Button>search</Button>
              </div>

              <div className="block border p-2 lg:hidden">
                <p className="text-vcr border-b-[1px] text-lg">
                  {user.username ?? "Retroji User"}
                </p>
                <button
                  type="submit"
                  onClick={handleLogout}
                  className="text-4xl cursor-pointer text-retro-blue lg:hover:underline"
                >
                  logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav overlay */}
          <div
            onClick={handleIsNavOpen}
            className={twMerge(
              !isNavOpen && "hidden",
              "absolute z-10 h-full w-full top-0 bg-black/40 lg:hidden",
            )}
          ></div>

          <div className="px-4 col-span-6 overflow-x-hidden lg:col-start-2 lg:col-end-6">
            <Outlet />
          </div>

          <div className="hidden border fixed right-6 p-2 lg:block">
            <p className="text-vcr border-b-[1px] text-lg">
              {user.username ?? "Retroji User"}
            </p>
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
