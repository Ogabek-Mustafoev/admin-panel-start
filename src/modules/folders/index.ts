import { type IRoute } from "@/types";
import { FolderPage } from "./pages/folder";
import { LuLayers3 } from "react-icons/lu";

export const folderRoute: IRoute = {
  path: "/folders",
  icon: LuLayers3,
  name: "taxonomy",
  component: FolderPage,
  access: new Set(["all"]),
};
