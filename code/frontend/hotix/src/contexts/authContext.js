import { createContext } from "react";

export const authContext = createContext({
  isLoggedIn: false,
  userId: null,
  state: "seller",
  token: null,
  userImage: null,
  login: () => {},
  logout: () => {},
  changeState: () => {},
});
