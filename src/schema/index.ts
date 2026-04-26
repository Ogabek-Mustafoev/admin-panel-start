import * as yup from "yup";

export const nameSchema = yup.object({
  uz: yup.string().required("requiredName"),
  en: yup.string().required("requiredName"),
  ru: yup.string().required("requiredName"),
});