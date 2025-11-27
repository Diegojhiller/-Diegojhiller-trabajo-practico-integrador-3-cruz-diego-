import { Navigate, Outlet } from "react-router";

export const PublicRouter = ({ isAuth }) => {
  return !isAuth ? <Outlet /> : <Navigate to="/home" />;
};


