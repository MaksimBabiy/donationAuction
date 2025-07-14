import { refreshToken } from "@/shared/api/refreshToken";
import { useIsAuthenticated } from "@/shared/hooks/useAuth";

import { ROUTES } from "@/shared/model/routes";

import { Navigate, Outlet, redirect } from "react-router";

const ProtectedRoute = () => {
  const isAuth = useIsAuthenticated();
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

export const ProtectedRouteLoader = async () => {
  const token = await refreshToken();
  console.log("token", token);

  if (!token) return redirect(ROUTES.LOGIN);
};
