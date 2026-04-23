import { Route, Routes } from "react-router-dom";

import type { IRoute } from "@/types";
import { useFilterRoutes } from "@/hooks";
import { authRoutes } from "@/modules/auth";
import { AuthLayout, BaseLayout } from "@/layouts";

const renderRoute = (routes: IRoute[]) =>
  routes.map(({ path, component: Component }) => (
    <Route path={path} key={path} element={<Component />} />
  ));

export const AuthorizedRoutes = () => {
  const { filteredRoutes } = useFilterRoutes();

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        {renderRoute(filteredRoutes)}
      </Route>
    </Routes>
  );
};

export const UnAuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {renderRoute(authRoutes)}
      </Route>
    </Routes>
  );
};
