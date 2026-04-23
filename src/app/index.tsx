import type { FC } from "react";
import { useAppProps } from "@/app/props.ts";

import { AuthorizedRoutes, UnAuthorizedRoutes } from "@/router";

export const App: FC = () => {
  const { isUserExist } = useAppProps();

  return isUserExist ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />;
};
