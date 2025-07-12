import { useIsAuthenticated } from "@/shared/hooks/useAuth";

import { ROUTES } from "@/shared/model/routes";

import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isAuth = useIsAuthenticated();
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
