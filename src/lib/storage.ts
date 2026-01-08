function getFromLocalStorage(key: string) {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return window.localStorage.getItem(key);
  }
}

function removeFromLocalStorage(key: string) {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return window.localStorage.removeItem(key);
  }
}

function setToLocalStorage(key: string, value: string) {
  if (!key || typeof window === "undefined") {
    return;
  } else {
    return window.localStorage.setItem(key, value);
  }
}

function clearLocalStorage() {
  if (typeof window === "undefined") {
    return;
  } else {
    return window.localStorage.clear();
  }
}

export {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
  clearLocalStorage,
};
