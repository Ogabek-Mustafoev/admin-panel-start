import { yupResolver } from "@hookform/resolvers/yup";
import { nameSchema } from ".";
import * as yup from "yup";
import type { IInitialData, IMeta, IResponse } from "@/types";

export const categorySchema = yup.object({
  name: nameSchema,
  image_url: yup.string().required("requiredImage"),
  mobile_image_url: yup.string().required("requiredMobileImage"),
  parent_id: yup.number().nullable(),
  is_active: yup.boolean().required("requiredActive"),
});

export type TCategoryField = yup.InferType<typeof categorySchema>;
export type ICategory = IInitialData & TCategoryField;

export const categoryResolver = yupResolver(categorySchema);

export type TCategoryData = IResponse<IMeta<ICategory[]>>;