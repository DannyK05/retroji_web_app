import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../components/common/input";
import { useLoginMutation } from "../../../store/api/auth";
import { useAppDispatch } from "../../../store/hooks";
import { setCredentials } from "../../../store/features/authSlice";
import { DEFAULT_PAGE_URL } from "../../../lib/constants";
import type { TLoginDto } from "../../../store/types/auth";
import { useHandleApiMessage } from "../../../components/common/message-banner/hooks";

export default function SignIn() {
   const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const {handleApiMessage} = useHandleApiMessage();

  const { register, handleSubmit } = useForm<TLoginDto>();
 
  const onSubmit: SubmitHandler<TLoginDto> = async (data) => {
    try {
      const response = await login(data);
      if (response.data) {
        dispatch(setCredentials(response.data.data.user));
        handleApiMessage(response.data)
        setTimeout(() => navigate(DEFAULT_PAGE_URL), 1000);
      }
    } catch (error) {
      console.log(error);
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
          <Input
            type="password"
            title="User Name"
            {...register("password")}
            placeholder="Password"
          />
        </label>

        <button
          type="submit"
          className=" text-center flex items-center justify-center font-bold text-press border-[1px] p-1 w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Sign in"}
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
