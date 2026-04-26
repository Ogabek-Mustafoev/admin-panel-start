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

const userUpdateSchema = yup.object({
  name: yup.string().required("requiredName"),
  surname: yup.string().required("requiredSurname"),
  email: yup.string().email("invalidEmail").required("requiredEmail"),
  phone: yup.string().matches(/^\d{12}$/, "invalidPhone").required("requiredPhone"),
});

export const userSchema = yup.object({
  ...userUpdateSchema.fields,
  ...loginUserSchema.fields
});

export type TLoginUserField = yup.InferType<typeof loginUserSchema>;
export type TUserField = yup.InferType<typeof userUpdateSchema>;

export const loginUserResolver = yupResolver(loginUserSchema);
export const userUpdateResolver = yupResolver(userUpdateSchema);

export interface IUser extends IInitialData, TUserField {
  email_verified_at?: string;
  verification_code?: string;
  verification_code_sent_at?: string;
  position?: string;
}
