import { type IRoute } from "@/types";
import { ProductsPage } from "./pages";
import { PiCubeDuotone } from "react-icons/pi";

export const productsRoute: IRoute = {
  path: "/products",
  icon: PiCubeDuotone,
  name: "products",
  component: ProductsPage,
  access: new Set(["all"]),
};
