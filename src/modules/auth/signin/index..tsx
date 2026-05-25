import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";

import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { useLoginMutation } from "../../../store/api/auth";
import { useAppDispatch } from "../../../store/hooks";
import {
  removeCredentials,
  setCredentials,
} from "../../../store/features/authSlice";

import Input from "../../../components/common/input";
import PasswordInput from "../../../components/common/password-input";
import Button from "../../../components/common/button";

import { DEFAULT_PAGE_URL } from "../../../lib/constants";
import type { TLoginDto } from "../../../store/types/auth";
import type { TErrorResponse } from "../../../store/types/generic";
import { freeServerMessage } from "../data";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<TLoginDto>();

  const onSubmit: SubmitHandler<TLoginDto> = async (data) => {
    const timeout = setTimeout(
      () => handleErrorMessage(freeServerMessage),
      10000,
    );

    try {
      dispatch(removeCredentials());

      const response = await login(data).unwrap();
      clearTimeout(timeout);
      
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
    } catch (error) {
      clearTimeout(timeout);
      handleErrorMessage(error as TErrorResponse);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl text-center">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">user name:</span>
          <Input
            title="User Name"
            {...register("username", { required: "Username is required" })}
            onChange={() => clearErrors()}
            placeholder="User Name"
            error={errors.username?.message}
          />
        </label>

        <label className="flex items-center space-x-4">
          <span className="text-4xl">password:</span>

          <PasswordInput
            title="Password"
            {...register("password", { required: "Password is required" })}
            onChange={() => clearErrors()}
            placeholder="Password"
            error={errors.password?.message}
          />
        </label>

        <Button isLoading={isLoading} type="submit" disabled={isLoading}>
          Sign In
        </Button>
      </form>

      <div className=" w-1/2 flex items-center justify-center text-3xl">
        <Link to="/signup" className="text-retro-link hover:underline">
          signup
        </Link>{" "}
        {/* <Link to="/reset-password" className="text-retro-link hover:underline">
          reset password
        </Link> */}
      </div>
    </div>
  );
}
