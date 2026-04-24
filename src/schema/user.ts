import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { IInitialData } from "@/types";

export const loginUserSchema = yup.object({
  type: yup.string().oneOf(["email", "phone"]).required("requiredType"),
  contact: yup.string().required("requiredContact").when("type", {
    is: "email",
    then: (schema) => schema.email("invalidEmail"),
    otherwise: (schema) => schema.matches(/^\d{12}$/, "invalidPhone"),
  }),
  password: yup.string().required("requiredPassword"),
});

export const userSchema = yup.object({
  ...loginUserSchema.fields,
  name: yup.string().required("requiredName"),
  surname: yup.string().required("requiredSurname"),
});

export type TLoginUserField = yup.InferType<typeof loginUserSchema>;
export type TUserField = yup.InferType<typeof userSchema>;

export const loginUserResolver = yupResolver(loginUserSchema);
export const userResolver = yupResolver(userSchema);

export interface IUser extends IInitialData, TUserField {
  email_verified_at?: string;
  email: string;
  phone: string;
  verification_code?: string;
  verification_code_sent_at?: string;
  position?: string;
}
