import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { RETROJI_TOKENS } from "../../lib/constants";
import { useAppDispatch } from "../../store/hooks";
import { removeCredentials } from "../../store/features/authSlice";

type RouteGuardProps = { children: ReactNode };

export default function RouteGuard({ children }: RouteGuardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  const token = localStorage.getItem(RETROJI_TOKENS);
  if (token) {
    const parsedToken = JSON.parse(token);
    if (!parsedToken || isTokenExpired(parsedToken.access)) {
      dispatch(removeCredentials());
      navigate("/");
    }
  } else {
    dispatch(removeCredentials());
    navigate("/");
  }

  return <>{children}</>;
}
