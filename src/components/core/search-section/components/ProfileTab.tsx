import ProfileCard from "../../../../modules/search/components/ProfileCard";
import EmptyScreen from "../../../common/empty-screen";
import { ProfileTabProps } from "../types";

export default function ProfileTab({ data }: ProfileTabProps) {
  return (
    <div className="w-full flex flex-col items-center space-y-3 py-2 px-1 lg:max-h-[450px] lg:px-3 lg:overflow-y-auto">
      {data && data.length > 0 ? (
        data.map(({ id, user }) => (
          <ProfileCard
            imageUrl="/assets/images/profile_pic.png"
            key={id}
            userId={user.id}
            username={user.username}
            followers={user.followers}
            following={user.following}
          />
        ))
      ) : (
        <EmptyScreen />
      )}
    </div>
  );
}
