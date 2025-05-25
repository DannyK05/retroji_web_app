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
          <div className=" flex flex-col space-y-2 col-span-1 fixed">
            <nav className="flex flex-col p-2 items-start text-orbitronio text-3xl border">
              <p className="text-4xl w-full border-b-[1px]">getting around</p>
              <NavLink to={"/scoops"}>scoops</NavLink>
              <NavLink to={"/snapz"}>snapz</NavLink>
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
              <button className="border w-full bg-grey-400">search</button>
            </div>
          </div>
          <div className="px-4 col-start-2 col-end-6">
            <Outlet />
          </div>
          <div className=" border-[1px] fixed right-6 p-2">
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
