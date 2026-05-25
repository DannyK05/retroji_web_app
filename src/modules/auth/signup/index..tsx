import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { CheckSquare2, Loader, XSquareIcon } from "lucide-react";

import { DEFAULT_PAGE_URL } from "../../../lib/constants";

import {
  removeCredentials,
  setCredentials,
} from "../../../store/features/authSlice";
import {
  useLazyIsUsernameTakenQuery,
  useSignupMutation,
} from "../../../store/api/auth";
import { useAppDispatch } from "../../../store/hooks";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";

import Input from "../../../components/common/input";
import PasswordInput from "../../../components/common/password-input";
import Button from "../../../components/common/button";

import type { TSignupDto } from "../../../store/types/auth";
import type { TErrorResponse } from "../../../store/types/generic";
import { freeServerMessage } from "../data";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<TSignupDto & { confirmPassword: string }>();

  const username = watch("username");
  const password = watch("password");

  const [signup, { isLoading }] = useSignupMutation();

  const [
    checkUsername,
    { data: isUsernameTaken, isLoading: isCheckingUsername },
  ] = useLazyIsUsernameTakenQuery();

  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const onSubmit: SubmitHandler<TSignupDto> = async (data) => {
    const timeout = setTimeout(
      () => handleErrorMessage(freeServerMessage),
      10000,
    );
    try {
      dispatch(removeCredentials());
      const response = await signup(data).unwrap();
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkUsername(username);
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl text-center">Sign up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">user name:</span>
          <div className="flex items-center space-x-2">
            <Input
              title="User Name"
              {...register("username", {
                required: "Username is required",
                max: {
                  value: 12,
                  message: "Password can't be more than 12 characters",
                },
              })}
              onChange={() => clearErrors()}
              placeholder="User Name"
              error={errors.username?.message}
            />
            {isCheckingUsername ? (
              <Loader />
            ) : isUsernameTaken ? (
              <XSquareIcon className="text-red-600" />
            ) : (
              <CheckSquare2 className="text-green-600" />
            )}
          </div>
        </label>

        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">email address:</span>
          <Input
            title="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "This is not a vaild email address",
              },
            })}
            onChange={() => clearErrors()}
            placeholder="Email Address"
            error={errors.email?.message}
          />
        </label>

        <label className="flex items-center space-x-4">
          <span className="text-4xl">password:</span>
          <PasswordInput
            title="User Password"
            {...register("password", {
              required: "Password is required",
              min: {
                value: 5,
                message: "Password can't be less than 5 characters",
              },
            })}
            onChange={() => clearErrors()}
            placeholder="Password"
            error={errors.password?.message}
          />
        </label>

        <label className="flex items-center space-x-4">
          <span className="text-4xl">confirm password:</span>
          <PasswordInput
            title="User Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            onChange={() => clearErrors()}
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
          />
        </label>

        <Button
          isLoading={isLoading}
          type="submit"
          disabled={isLoading || isUsernameTaken}
        >
          Sign Up
        </Button>
      </form>
      <div className=" w-1/2 text-3xl text-center">
        <Link to="/" className="text-retro-link hover:underline">
          signin
        </Link>
      </div>
    </div>
  );
}
