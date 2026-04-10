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
import Button from "../../components/common/button";
import { useHandleApiMessage } from "../../components/common/message-banner/hooks";
import { TErrorResponse } from "../../store/types/generic";

export default function Profile() {
  const [follow] = useFollowUserMutation();
  const user: TUser = getUserData();
  const params = useParams();
  const id = params.id ?? "";

  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const nav: TNav[] = ["snapz", "scoops", "replies", "likes"];

  const [currentNav, setCurrentNav] = useState<TNav>("snapz");

  const handleCurrentNav = (nav: TNav) => {
    setCurrentNav(nav);
  };

  const { data: profile } = useGetUserProfileQuery(id);

  const followUser = async () => {
    try {
      const data = {
        user_id: profile?.data.profile.user.id.toString() ?? "",
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
    <section className="relative w-full h-[calc(100vh-70px)] flex flex-col items-center mt-5 border pb-2 overflow-y-auto lg:h-[calc(100vh-70px)]">
      <div className="w-full h-40 overflow-hidden lg:h-60">
        <img
          className="w-full object-cover"
          src="/assets/images/scoop_4.webp"
          alt="Cover Image"
        />
      </div>

      <div className="absolute z-5 top-30 w-4/5 lg:top-50 lg:w-3/5 flex flex-col items-center border bg-white pt-11 px-2">
        <img
          className="absolute top-[-50px] lg:top-[-80px] w-20 h-20 lg:w-30 lg:h-30 object-cover border-2"
          src="/assets/images/profile_pic.jpg"
          alt="Cover Image"
        />

        <div className="flex flex-col items-center">
          <h2 className="text-3xl">{profile?.data.profile.user?.username}</h2>
          <div className="flex items-center space-x-4 text-2xl">
            <p>
              <span className="text-retro-blue font-semibold">
                {profile?.data.profile.user?.following}
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
          {user.id.toString() !== params.id && (
            <Button
              className="w-full"
              onClick={() => {
                followUser();
              }}
            >
              Follow
            </Button>
          )}
        </div>

        <div className="w-full flex flex-col items-start">
          <p className="w-full text-2xl mb-[1px] border-b">Bio:</p>
          <p className="text-2xl">Just trying to survive</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center pt-40 px-3">
        <div className="w-4/5 lg:w-3/5 h-7 flex items-center justify-between p-2 text-3xl border">
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
      </div>

      <div className="w-full flex flex-col items-center space-y-2"></div>
    </section>
  );
}
