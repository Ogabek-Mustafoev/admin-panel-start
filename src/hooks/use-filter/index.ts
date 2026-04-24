import { routes } from "@/modules";
import type { IRoute } from "@/types";

import { useMemo } from "react";

export const useFilterRoutes = () => {

  const filterRoutes = (routes: IRoute[]): IRoute[] => {
    return routes.reduce<IRoute[]>((acc, { children, access, ...route }) => {
      acc.push({ ...route, access });

      if (children?.length) {
        const filteredChildren = filterRoutes(children);
        acc.push(...filteredChildren);
      }

      return acc;
    }, []);
  };

  const filteredRoutes = useMemo(() => filterRoutes(routes), []);
  const sideBarLinks = useMemo(
    () => filteredRoutes.filter(({ icon }) => icon),
    [filteredRoutes.length],
  );

  return {
    sideBarLinks,
    filteredRoutes,
  };
};
