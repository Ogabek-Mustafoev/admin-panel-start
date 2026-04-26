import { type IRoute } from "@/types";
import { CategoryPage } from "./pages/category";
import { BiCategory } from "react-icons/bi";

export const categoryRoute: IRoute = {
  path: "/category",
  icon: BiCategory,
  name: "category",
  component: CategoryPage,
  access: new Set(["all"]),
};