import type { IRoute } from "@/types";
import { categoryRoute } from "@/modules/category";
import { folderRoute } from "@/modules/folders";
import { productsRoute } from "./products";

export const routes: IRoute[] = [categoryRoute, productsRoute, folderRoute];
