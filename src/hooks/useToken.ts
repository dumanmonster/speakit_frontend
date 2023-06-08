import Cookies from "js-cookie";

export const useToken = () => {
  const token = Cookies.get("_auth");

  return [token];
};
