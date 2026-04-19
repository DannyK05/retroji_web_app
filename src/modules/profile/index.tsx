import { useState } from "react";
import type { TNav } from "./types";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router";
import {
  useFollowUserMutation,
  useGetUserProfileQuery,
} from "../../store/api/profile";
import { TUser } from "../../store/types/auth";
import { getUserData } from "../../lib/helpers";
import { useHandleApiMessage } from "../../components/common/message-banner/hooks";
import Button from "../../components/common/button";
import SnapzSection from "./components/SnapzSection";
import ScoopsSection from "./components/ScoopsSection";
import CommentsSection from "./components/CommentsSection";

import { TErrorResponse } from "../../store/types/generic";

export default function Profile() {
  const [follow] = useFollowUserMutation();
  const user: TUser = getUserData();
  const params = useParams();
  const id = params.id ?? "";

  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const nav: TNav[] = ["snapz", "scoops", "comments"];

  const [currentNav, setCurrentNav] = useState<TNav>("snapz");

  const handleCurrentNav = (nav: TNav) => {
    setCurrentNav(nav);
  };

  const { data: profile } = useGetUserProfileQuery(id);

  const followUser = async () => {
    try {
      const data = {
        user_id: profile?.data.profile.user.id?.toString() ?? "",
      };
      const response = await follow(data);
      if (response.data) {
        handleApiMessage(response);
      }
    } catch (error: any) {
      handleErrorMessage(error.data as TErrorResponse);
    }
  };

  return (
    <section className="w-full h-[calc(100vh-70px)] flex flex-col items-center mt-5 pb-2 overflow-y-auto lg:border lg:h-[calc(100vh-70px)]">
      <img
        className="w-full h-40 object-cover lg:h-60"
        src="/assets/images/scoop_4.webp"
        alt="Cover Image"
      />

      <div className="w-4/5 flex flex-col items-center -mt-10 border bg-white pt-11 px-2 lg:w-3/5 lg:-mt-10">
        <img
          className="w-20 h-20 object-cover -mt-20 border-2  lg:w-30 lg:h-30 lg:-mt-20"
          src="/assets/images/profile_pic.jpg"
          alt="Profile Pic"
        />

        <div className="flex flex-col items-center">
          <h2 className="text-3xl">
            {profile?.data.profile.user?.username ?? "retroji_user"}
          </h2>
          <div className="flex items-center space-x-4 text-2xl">
            <p>
              <span className="text-retro-blue font-semibold">
                {profile?.data.profile.user?.following ?? 0}
              </span>{" "}
              following
            </p>

            <span>.</span>

            <p>
              <span className="text-retro-blue font-semibold">
                {profile?.data.profile.user?.followers ?? 0}
              </span>{" "}
              followers
            </p>
          </div>

          {user.id?.toString() !== params.id && (
            <Button
              className="w-full"
              onClick={() => {
                followUser();
              }}
            >
              {profile?.data.profile.is_followed ? "Following" : "Follow"}
            </Button>
          )}
        </div>

        <div className="w-full flex flex-col items-start">
          <p className="w-full text-2xl mb-[1px] border-b">Bio:</p>
          <p className="text-2xl">Just trying to survive</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center px-3">
        <div className="w-4/5 h-7 flex items-center justify-between p-2 text-3xl border mt-4 lg:w-3/5">
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

        <h2 className="w-full text-left text-3xl">{currentNav}</h2>

        {currentNav === "snapz"
          ? profile && <SnapzSection userId={profile.data.profile.user?.id} />
          : currentNav === "scoops"
            ? profile && (
                <ScoopsSection userId={profile.data.profile.user?.id} />
              )
            : profile && (
                <CommentsSection userId={profile.data.profile.user?.id} />
              )}
      </div>
    </section>
  );
}
