import type { IRoute } from "@/types";
import { folderRoute } from "@/modules/folders";
import { categoryRoute } from "@/modules/category";

import { productsRoute } from "./products";

export const routes: IRoute[] = [categoryRoute, ...productsRoute, folderRoute];
