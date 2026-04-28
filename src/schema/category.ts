import { yupResolver } from "@hookform/resolvers/yup";
import { nameSchema } from ".";
import * as yup from "yup";
import type { IInitialData } from "@/types";

export const categorySchema = yup.object({
  name: nameSchema,
  image_url: yup.string().required("requiredField"),
  mobile_image_url: yup.string().required("requiredField"),
  parent_id: yup.number().nullable(),
  is_active: yup.boolean().required("requiredActive"),
});

export type TCategoryField = yup.InferType<typeof categorySchema>;
export interface ICategory extends IInitialData, TCategoryField {
  children?: ICategory[];
}

export const categoryResolver = yupResolver(categorySchema);

