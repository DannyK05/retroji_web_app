import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../components/common/input";
import PasswordInput from "../../../components/common/password-input";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";

import { useSignupMutation } from "../../../store/api/auth";
import { useAppDispatch } from "../../../store/hooks";
import { setCredentials } from "../../../store/features/authSlice";
import { DEFAULT_PAGE_URL } from "../../../lib/constants";
import type { TSignupDto } from "../../../store/types/auth";
import type { TErrorResponse } from "../../../store/types/generic";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [signup, { isLoading }] = useSignupMutation();
  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const { register, handleSubmit } = useForm<TSignupDto>();

  const onSubmit: SubmitHandler<TSignupDto> = async (data) => {
    try {
      const response = await signup(data).unwrap();

      if (response.data) {
        dispatch(setCredentials(response.data.user));
        handleApiMessage(response);
        setTimeout(() => navigate(DEFAULT_PAGE_URL), 1000);
      }
    } catch (error: any) {
      handleErrorMessage(error.data as TErrorResponse);
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
          <PasswordInput
            title="User Password"
            {...register("password")}
            placeholder="Password"
          />
        </label>

        <label className="flex items-center space-x-4">
          <span className="text-4xl">confirm password:</span>
          <PasswordInput
            title="User Password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </label>

        <button
          type="submit"
          className="text-center flex items-center justify-center font-bold text-press border-[1px] p-1 w-full cursor-pointer"
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
