import type { TProfile } from "../../../store/types/profile";
import type { TScoops } from "../../../store/types/scoops";
import type { TSearchResponse } from "../../../store/types/search";
import type { TComment, TSnapz } from "../../../store/types/snapz";

export type SearchSectionProps = { query: string };

export type TNav = "all" | "snapz" | "scoops" | "profiles" | "comments";

export type AllTabProps = {
  data: TSearchResponse["data"];
  handleNav: (nav: TNav) => void;
};

export type SnapzTabProps = { data: TSnapz[] };

export type ScoopsTabProps = { data: TScoops[] };

export type CommentsTabProps = { data: TComment[] };

export type ProfileTabProps = { data: TProfile[] };
