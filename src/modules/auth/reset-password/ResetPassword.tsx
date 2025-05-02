import { Link } from "react-router";
import Input from "../../../components/common/input";

export default function ResetPassword() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl text-center">Reset Password</h1>
      <form className="space-y-4">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">email address:</span>
          <Input
            title="Email Address"
            name="emailAddress"
            placeholder="Email Address"
          />
        </label>
        <label className="flex items-center space-x-4">
          <span className="text-4xl">password:</span>
          <Input
            type="password"
            title="User Password"
            name="password"
            placeholder="Password"
          />
        </label>
        <label className="flex items-center space-x-4">
          <span className="text-4xl">confirm password:</span>
          <Input
            type="password"
            title="User Password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </label>
        <button
          type="submit"
          className=" text-center font-bold text-press border-[1px] p-1 w-full "
        >
          Reset
        </button>
      </form>
      <div className=" w-1/2 flex items-center justify-between  text-3xl">
        <Link to="/signup" className="underline">
          signup
        </Link>{" "}
        <Link to="/" className="underline">
          signin
        </Link>
      </div>
    </div>
  );
}
