import { RETROJI_USER } from "./constants";
import { getFromLocalStorage } from "./storage";

export const getUserData = () => {
  const userData = getFromLocalStorage(RETROJI_USER);

  if (userData) {
    return JSON.parse(userData);
  } else {
    return "Unknown User";
  }
};
