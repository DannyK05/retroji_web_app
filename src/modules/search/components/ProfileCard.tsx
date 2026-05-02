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
      className="min-w-60 flex items-center space-x-3 border px-1"
    >
      <img
        className="max-h-16 object-cover border"
        src={imageUrl}
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
