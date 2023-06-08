import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FC } from "react";
import { Roles } from "../api/interfaces";

type RequireAuthProps = {
  allowedRole: "USER" | "ADMIN";
};
const RequireAuth: FC<RequireAuthProps> = ({ allowedRole }) => {
  const { getUser } = useAuth();
  const location = useLocation();
  const user = getUser();
  return allowedRole === user?.role ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
