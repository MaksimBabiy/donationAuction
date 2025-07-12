import { useIsAuthenticated } from "@/shared/hooks/useAuth";
import { ROUTES } from "@/shared/model/routes";
import { Navigate } from "react-router";

const RequireUnauth = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useIsAuthenticated();

  if (isAuth) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default RequireUnauth;
