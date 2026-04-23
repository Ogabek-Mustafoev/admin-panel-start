import type { IRoute } from "@/types";

import { Login } from "./pages/login.tsx";

export const authRoutes: IRoute[] = [
  {
    name: "login",
    path: "/login",
    component: Login,
    access: new Set(["all"]),
  },
  // {
  //   name: "Register",
  //   path: "/register",
  //   component: Register,
  // }
];
