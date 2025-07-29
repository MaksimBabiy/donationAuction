import { createBrowserRouter } from "react-router";
import App from "./App";
import LoginPage from "@/features/auth/ui/login.page";
import { ROUTES } from "@/shared/model/routes";
import Providers from "./providers";
import AuctionPage from "@/features/auction/ui/auction.page";
import ProtectedRoute, { ProtectedRouteLoader } from "./protectedRoute";
import RequireUnauth from "./requireUnauth";
import Header from "@/features/header/ui/header";
import { WheelPage } from "@/features/wheel";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: ProtectedRouteLoader,
        element: (
          <>
            <Header />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.HOME,
            element: <AuctionPage />,
          },
          {
            path: ROUTES.WHEEL,
            element: <WheelPage />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <>
            <RequireUnauth>
              <LoginPage />
            </RequireUnauth>
          </>
        ),
      },
    ],
  },
]);
