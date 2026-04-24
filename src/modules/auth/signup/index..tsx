import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../components/common/input";
import PasswordInput from "../../../components/common/password-input";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";

import {
  useIsUsernameTakenQuery,
  useSignupMutation,
} from "../../../store/api/auth";
import { useAppDispatch } from "../../../store/hooks";
import {
  removeCredentials,
  setCredentials,
} from "../../../store/features/authSlice";
import { DEFAULT_PAGE_URL } from "../../../lib/constants";
import type { TSignupDto } from "../../../store/types/auth";
import type { TErrorResponse } from "../../../store/types/generic";
import { CheckSquare2, Loader, XSquareIcon } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, watch, handleSubmit } = useForm<TSignupDto>();

  const username = watch("username");

  const [signup, { isLoading }] = useSignupMutation();

  const { data: isUsernameTaken, isLoading: isCheckingUsername } =
    useIsUsernameTakenQuery(username);

  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const onSubmit: SubmitHandler<TSignupDto> = async (data) => {
    try {
      dispatch(removeCredentials());
      const response = await signup(data).unwrap();

      if (response.data) {
        dispatch(
          setCredentials({
            user: response.data.user,
            tokens: response.tokens,
          }),
        );
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
          <div className="flex items-center space-x-2">
            <Input
              title="User Name"
              {...register("username")}
              placeholder="User Name"
            />
            {isCheckingUsername ? (
              <Loader />
            ) : isUsernameTaken ? (
              <XSquareIcon className="text-[#C82432]" />
            ) : (
              <CheckSquare2 className="text-[#0D9323]" />
            )}
          </div>
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
          className="text-center flex items-center justify-center font-bold text-press border p-1 w-full cursor-pointer"
          disabled={isLoading || isUsernameTaken}
        >
          {!isLoading ? "Sign up" : "..."}
        </button>
      </form>
      <div className=" w-1/2 text-3xl text-center">
        <Link to="/" className="text-retro-link hover:underline">
          signin
        </Link>
      </div>
    </div>
  );
}
