import { NavLink, Outlet, useNavigate } from "react-router";

import { useLogoutMutation } from "../../store/api/auth";
import { useAppDispatch } from "../../store/hooks";
import { removeCredentials } from "../../store/features/authSlice";

import { useHandleApiMessage } from "../common/message-banner/hooks";
import { getUserData } from "../../lib/helpers";

import MessageBanner from "../common/message-banner";

import type { TApiResponse } from "../../store/types/generic";
import type { TUser } from "../../store/types/auth";
import { MenuIcon, XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import RouteGuard from "./RouteGuard";
import SearchSection from "../core/search-section";

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { handleApiMessage } = useHandleApiMessage();
  const user: TUser = getUserData();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [search, setSearch] = useState("");

  const nav = [
    { name: "snapz", link: "/snapz" },
    { name: "scoops", link: "/scoops" },
    { name: "profile", link: `/profile/${user.id}` },
    { name: "search", link: "/search" },
  ];

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
          <MenuIcon className="size-8" />
        </button>
        <h1 className="text-pacifico text-center text-retro-blue text-4xl">
          Retroji
        </h1>
      </header>

      <main className="lg:px-4">
        <MessageBanner />

        <div className="grid grid-cols-6 w-full gap-x-4">
          <div
            className={twMerge(
              "h-full z-50 fixed top-0 -translate-x-full px-2 pt-3 bg-white border-r-1 transition-all duration-300 lg:border-r-0 lg:static lg:translate-x-0 lg:block lg:z-10",
              isNavOpen && "translate-x-0",
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
                {nav.map(({ name, link }) => (
                  <NavLink
                    key={name}
                    className={twMerge(
                      name === "search" && "lg:hidden",
                      "text-retro-link hover:underline",
                    )}
                    onClick={() => {
                      setSearch("");
                      handleIsNavOpen();
                    }}
                    to={link}
                  >
                    {name}
                  </NavLink>
                ))}
              </nav>

              <div className="hidden border text-3xl p-1 lg:block">
                <p className="font-semibold text-4xl">search</p>

                <input
                  className="border p-1 w-full"
                  title="Search"
                  placeholder="Dig it.."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  type="search"
                />
              </div>

              <div className="block border p-2 lg:hidden">
                <p className="text-vcr border-b-[1px] text-lg">
                  {user.username ?? "retroji_user"}
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

          <div className="col-span-6 overflow-hidden lg:px-4 lg:col-start-2 lg:col-end-6">
            {search === "" ? (
              <RouteGuard>
                <Outlet />
              </RouteGuard>
            ) : (
              <SearchSection query={search} />
            )}
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
