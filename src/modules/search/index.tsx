import { useState } from "react";
import SearchSection from "../../components/core/search-section";

export default function Search() {
  const [search, setSearch] = useState("");
  return (
    <div className="w-full flex flex-col items-center space-y-1">
      {" "}
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
      <SearchSection query={search} />
    </div>
  );
}
