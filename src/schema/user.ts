import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const loginUserSchema = yup.object({
  type: yup.string().oneOf(["email", "phone"]).required("requiredType"),
  contact: yup.string().required("requiredContact").when("type", {
    is: "email",
    then: (schema) => schema.email("invalidEmail"),
    otherwise: (schema) => schema.matches(/^\d{12}$/, "invalidPhone"),
  }),
  code: yup.number().required("requiredCode"),
});

export const userSchema = loginUserSchema.concat(
  yup.object({
    name: yup.string().required("requiredName"),
    surname: yup.string().required("requiredSurname"),
    password: yup.string().required("requiredPassword"),
  })
);

export type TLoginUserField = yup.InferType<typeof loginUserSchema>;
export type TUserField = yup.InferType<typeof userSchema>;

export const loginUserResolver = yupResolver(loginUserSchema);
export const userResolver = yupResolver(userSchema);