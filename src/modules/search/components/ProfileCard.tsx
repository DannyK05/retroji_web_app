import { Link, useNavigate } from "react-router";

type ProfileCardProps = {
  userId: number;
  username: string;
  followers: number;
  following: number;
  imageUrl: string;
};

export default function ProfileCard({
  userId,
  username,
  followers,
  following,
  imageUrl,
}: ProfileCardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/profile/${userId}`)}
      className="w-full flex items-center space-x-3 border-y px-1 lg:min-w-60"
    >
      <img
        className="max-h-16 object-cover border"
        src={imageUrl ?? "/assets/images/profile_pic.png"}
        alt="Profile Picture"
      />
      <div className="flex flex-col space-y-2 text-2xl px-2">
        <Link className="hover:underline" to={`/profile/${userId}`}>
          {username}
        </Link>
        <div className="flex items-center space-x-4 text-xl border-t">
          <p>{following} Following</p> <p>{followers} Followers</p>
        </div>
      </div>
    </div>
  );
}
