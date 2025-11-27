import { Navigate, Outlet } from "react-router";

export const PrivateRouter = ({ isAuth }) => {
  return isAuth ? (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/register" />
  );
};
