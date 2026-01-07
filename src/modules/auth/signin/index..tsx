import { Link } from "react-router";
import Input from "../../../components/common/input";

export default function SignIn() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl text-center">Sign in</h1>

      <form className="space-y-4">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">username:</span>
          <Input title="User Name" name="userName" placeholder="UserName" />
        </label>

        <label className="flex items-center space-x-4">
          <span className="text-4xl">password:</span>
          <Input
            type="password"
            title="User Name"
            name="Password"
            placeholder="Password"
          />
        </label>

        <button
          type="submit"
          className=" text-center font-bold text-press border-[1px] p-1 w-full "
        >
          Sign in
        </button>
      </form>
      
      <div className=" w-1/2 flex items-center justify-between  text-3xl">
        <Link to="/signup" className="underline">
          signup
        </Link>{" "}
        <Link to="/reset-password" className="underline">
          reset password
        </Link>
      </div>
    </div>
  );
}
