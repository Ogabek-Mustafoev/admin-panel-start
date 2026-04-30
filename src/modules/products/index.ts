import { type IRoute } from "@/types";
import { ProductsPage } from "./pages";
import { PiCubeDuotone } from "react-icons/pi";
import { ProductEditPage } from "./pages/product-edit";

export const productsRoute: IRoute[] = [
  {
    path: "/products",
    icon: PiCubeDuotone,
    name: "products",
    component: ProductsPage,
    access: new Set(["all"]),
  },
  {
    path: "/products/:id",
    name: "products",
    component: ProductEditPage,
    access: new Set(["all"]),
  },
];
