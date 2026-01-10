import { Link, useNavigate } from "react-router";
import Input from "../../../components/common/input";
import { SubmitHandler, useForm } from "react-hook-form";
import type { TSignupDto } from "../../../store/types/auth";
import { useSignupMutation } from "../../../store/api/auth";
import { useAppDispatch } from "../../../store/hooks";
import { setCredentials } from "../../../store/features/authSlice";
import { DEFAULT_PAGE_URL } from "../../../lib/constants";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<TSignupDto>();
  const [signup, { isLoading }] = useSignupMutation();
  const onSubmit: SubmitHandler<TSignupDto> = async (data) => {
    try {
      const response = await signup(data);
      if (response.data) {
        dispatch(setCredentials(response.data.user));
        setTimeout(() => navigate(DEFAULT_PAGE_URL), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl text-center">Sign up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">user name:</span>
          <Input
            title="User Name"
            {...register("username")}
            placeholder="User Name"
          />
        </label>

        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">email address:</span>
          <Input
            title="Email Address"
            {...register("email")}
            placeholder="Email Address"
          />
        </label>

        <label className="flex items-center space-x-4">
          <span className="text-4xl">password:</span>
          <Input
            type="password"
            title="User Password"
            {...register("password")}
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
          className="text-center font-bold text-press border-[1px] p-1 w-full cursor-pointer"
          disabled={isLoading}
        >
          {!isLoading ? "Sign up" : "..."}
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
