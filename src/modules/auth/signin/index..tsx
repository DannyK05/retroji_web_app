import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../components/common/input";
import PasswordInput from "../../../components/common/password-input";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";
import { useLoginMutation } from "../../../store/api/auth";
import { useAppDispatch } from "../../../store/hooks";
import {
  removeCredentials,
  setCredentials,
} from "../../../store/features/authSlice";
import { DEFAULT_PAGE_URL } from "../../../lib/constants";
import type { TLoginDto } from "../../../store/types/auth";
import type { TErrorResponse } from "../../../store/types/generic";
import Button from "../../../components/common/button";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { handleApiMessage, handleErrorMessage } = useHandleApiMessage();

  const { register, handleSubmit } = useForm<TLoginDto>();

  const onSubmit: SubmitHandler<TLoginDto> = async (data) => {
    try {
      dispatch(removeCredentials());

      const response = await login(data).unwrap();
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
      handleErrorMessage(error as TErrorResponse);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl text-center">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="flex flex-row items-center space-x-4">
          <span className="text-4xl">user name:</span>
          <Input
            title="User Name"
            {...register("username")}
            placeholder="User Name"
          />
        </label>

        <label className="flex items-center space-x-4">
          <span className="text-4xl">password:</span>
          <PasswordInput
            title="Password"
            {...register("password")}
            placeholder="Password"
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
