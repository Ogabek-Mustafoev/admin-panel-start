import type { IRoute } from "@/types";
import { ProfilePage } from "@/modules/profile/page";


export const profileRoute: IRoute = {
  name: "profile",
  path: "/profile",
  component: ProfilePage,
  isHideInMenu: true,
  access: new Set(["all"]),
}