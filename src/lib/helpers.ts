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

export const shortenString = (str: string, count = 20) => {
  return str.length > count ? str.slice(0, count) + "..." : str;
};

export const getRelativeTime = (date: Date) => {
  const now = new Date();
  const past = new Date(date);

  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < 0) return "just now";

  if (diff < minute) {
    return `${diff} sec${diff !== 1 ? "s" : ""}`;
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)} min`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hr`;
  } else if (diff < week) {
    return `${Math.floor(diff / day)} d`;
  } else {
    const isDifferentYear = now.getFullYear() !== past.getFullYear();
    return past.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      ...(isDifferentYear && { year: "numeric" }),
    });
  }
};
