import type { IRoute } from "@/types";
import { categoryRoute } from "@/modules/category";
import { folderRoute } from "@/modules/folders";

export const routes: IRoute[] = [categoryRoute, folderRoute];
