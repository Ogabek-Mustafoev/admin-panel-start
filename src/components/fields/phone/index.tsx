import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { PhoneInput as Phone } from "react-international-phone";
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import "react-international-phone/style.css";

export const PhoneInput = <T extends FieldValues>(
  props: UseControllerProps<T>,
) => {
  const { pathname } = useLocation();
  const { t } = useTranslation("errors");
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <div>
      <p className="mb-1.5 font-medium">
        {t("phone", { ns: "form" })}{" "}
        <span className="font-bold text-red-500">*</span>
      </p>
      <Phone
        className={`w-full ${pathname !== "/login" && "dark:border-neutral-700 dark:bg-neutral-900"} bg-white ${error?.message ? "border-red-600" : "border-gray-300"} border`}
        defaultCountry="uz"
        countries={[["Uzbekistan", "uz", "998", ".. ... .. .."]]}
        forceDialCode
        inputClassName={`w-full !bg-transparent text-black ${pathname !== "/login" && "dark:text-white!"}`}
        inputProps={{
          inputMode: "numeric",
          autoComplete: "on",
        }}
        {...field}
        onChange={(value) => field.onChange(value.replace(/^\+/, ""))}
      />
      {error?.message && (
        <p className="text-xs text-red-500">{t(error.message)}</p>
      )}
    </div>
  );
};
