import { Link, NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <header>
        <h1 className="text-pacifico text-center text-retro-blue text-4xl">
          Retroji
        </h1>
      </header>
      <main className="px-4">
        <div className="grid grid-cols-6 w-full gap-x-4">
          <nav className="flex flex-col col-span-1 p-2 items-start text-orbitronio text-3xl border-[1px]">
            <p className="text-4xl w-full border-b-[1px]">getting around</p>
            <NavLink to={"/scoops"}>scoops</NavLink>
            <NavLink to={"/snapz"}>snapz</NavLink>
            <NavLink to={"/profile"}>profile</NavLink>
          </nav>
          <div className="px-4 col-start-2 col-end-6">
            <Outlet />
          </div>
          <div className=" border-[1px] p-2">
            <p className="text-vcr border-b-[1px] text-lg">Kolade</p>
            <Link className="text-4xl" to={"/"}>
              logout
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
