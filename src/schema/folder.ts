import type { IInitialData } from "@/types";
import * as yup from "yup";
import { nameSchema } from ".";
import { yupResolver } from "@hookform/resolvers/yup";

export const folderSchema = yup.object().shape({
  name: nameSchema.concat(
    yup.object({
      cn: yup.string().required(),
    }),
  ),
  parent_id: yup.number().nullable(),
});

export type TFolderSchema = yup.InferType<typeof folderSchema>;
export type TFolderField = TFolderSchema;

export interface IFolder extends TFolderSchema, IInitialData {
  children?: IFolder[];
}

export const folderResolver = yupResolver(folderSchema);
