import { Link } from "react-router";
import Input from "../../../components/common/input";

export default function SignUp() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl text-center">Sign in</h1>
      <form className="space-y-4">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">first name:</span>
          <Input title="First Name" name="firstName" placeholder="First Name" />
        </label>
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">last name:</span>
          <Input title="Last Name" name="lastName" placeholder="Last Name" />
        </label>
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
          Sign up
        </button>
      </form>
      <div className=" w-1/2 text-3xl text-center">
        <Link to="/" className="underline">
          signin
        </Link>
      </div>
    </div>
  );
}
