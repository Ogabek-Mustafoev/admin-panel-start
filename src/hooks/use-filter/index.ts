import { routes } from "@/modules";
import type { IRoute } from "@/types";
import { useAppSelector } from "@/hooks";

import { useMemo } from "react";

export const useFilterRoutes = () => {
  const { data } = useAppSelector((state) => state?.auth);

  const filterRoutes = (routes: IRoute[]): IRoute[] => {
    return routes.reduce<IRoute[]>((acc, { children, access, ...route }) => {
      if (access?.has("all") || (data && access?.has(data?.id))) {
        acc.push({ ...route, access });

        if (children?.length) {
          const filteredChildren = filterRoutes(children);
          acc.push(...filteredChildren);
        }
      }

      return acc;
    }, []);
  };

  const filteredRoutes = useMemo(() => filterRoutes(routes), [data]);
  const sideBarLinks = useMemo(
    () => filteredRoutes.filter(({ icon }) => icon),
    [filteredRoutes.length],
  );

  return {
    sideBarLinks,
    filteredRoutes,
  };
};
