import React, { FC, createContext, useEffect, useState } from "react";
import { User } from "../api/interfaces";

interface AuthContextType {
  login: (accessToken: string) => void;
  loginWithGoogle: (accessToken: string) => void;
  logout: () => void;
  updateUserInfo: (user: User) => void;
  getUser: () => User | null;
}
// Create the context
export const AuthContext = createContext<AuthContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loginWithGoogle: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUserInfo: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getUser: () => null,
});
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authed, setAuthed] = useState<boolean>(false);
  // side

  // functions
  const login = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  };

  const loginWithGoogle = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  const updateUserInfo = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUser = () => {
    let userData;
    const storedData = localStorage.getItem("user");
    if (storedData !== null) {
      userData = JSON.parse(storedData);
    }
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getUser,
        loginWithGoogle,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
