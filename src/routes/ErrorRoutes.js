import { lazy } from "react";
import AuthGuard from "utils/route-guard/AuthGuard";
import GuestGuard from "utils/route-guard/GuestGuard";
import Loadable from "components/Loadable";
// project import

import MainLayout from "layout/MainLayout";

const Error404 = Loadable(lazy(() => import("pages/pageNotFound")));

const MainRoutes = {
  path: "*",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "*",
      element: <Error404 />,
    },
  ],
};

export default MainRoutes;
