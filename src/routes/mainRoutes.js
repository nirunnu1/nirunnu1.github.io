import { lazy } from "react";
import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";

// render - login
const HomePage = Loadable(lazy(() => import("pages/HomePage")));


const LoginRoutes = {
  path: "/",
  element: (
    <MinimalLayout />
  ),
  children: [
    {
      path: "",
      element: <HomePage />,
    },
  ],
};

export default LoginRoutes;
