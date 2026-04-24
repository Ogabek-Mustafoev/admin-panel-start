import type { IRoute } from "@/types";
import { ProfilePage } from "@/modules/profile/page";

import { FaHouseChimneyUser } from "react-icons/fa6";

export const profileRoute: IRoute = {
  name: "profile",
  path: "/profile",
  component: ProfilePage,
  icon: FaHouseChimneyUser,
  access: new Set(["all"]),
}