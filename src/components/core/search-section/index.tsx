import { useState } from "react";
import { useSearchQuery } from "../../../store/api/search";
import EmptyScreen from "../../common/empty-screen";
import LoadingScreen from "../../common/loading-screen";
import type { SearchSectionProps, TNav } from "./types";
import { twJoin } from "tailwind-merge";
import AllTab from "./components/AllTab";
import SnapzTab from "./components/SnapzTab";
import ScoopsTab from "./components/ScoopsTab";
import CommentsTab from "./components/CommentsTab";
import ProfileTab from "./components/ProfileTab";

export default function SearchSection({ query }: SearchSectionProps) {
  const nav: TNav[] = ["all", "snapz", "scoops", "profiles", "comments"];

  const [currentNav, setCurrentNav] = useState<TNav>("all");

  const handleCurrentNav = (nav: TNav) => {
    setCurrentNav(nav);
  };

  const { data, isLoading } = useSearchQuery(query);
  return (
    <div className="w-full h-screen flex flex-col items-center border">
      <h2 className="text-4xl">Search Results for {`"${query}"`}</h2>
      {isLoading ? (
        <LoadingScreen />
      ) : data ? (
        <>
          <div className="w-4/5 h-7 flex items-center justify-between p-2 text-3xl border mt-2 lg:w-3/5">
            {nav.map((nav, index) => (
              <span
                key={index}
                onClick={() => handleCurrentNav(nav)}
                className={twJoin(
                  "text-retro-blue cursor-pointer active:underline lg:hover:underline",
                  currentNav == nav && "underline",
                )}
              >
                {nav}
              </span>
            ))}
          </div>
          <div className="w-full mt-2 border-t p-1">
            {currentNav === "all" ? (
              <AllTab data={data.data} handleNav={handleCurrentNav} />
            ) : currentNav === "snapz" ? (
              <SnapzTab data={data.data.snapz} />
            ) : currentNav == "scoops" ? (
              <ScoopsTab data={data.data.scoops} />
            ) : currentNav === "comments" ? (
              <CommentsTab data={data.data.comments} />
            ) : (
              <ProfileTab data={data.data.profiles} />
            )}
          </div>
        </>
      ) : (
        <EmptyScreen />
      )}
    </div>
  );
}
