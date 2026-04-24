import type { FC } from "react";
import { useAppProps } from "@/app/props.ts";

import { AuthorizedRoutes, UnAuthorizedRoutes } from "@/router";
import { PageLoader } from "@/components";

export const App: FC = () => {
  const { isUserExist, isLoading } = useAppProps();

  if (isLoading) {
    return <PageLoader />
  }


  return isUserExist ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />;
};
