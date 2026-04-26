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

  const isLogin = pathname === "/login";

  return (
    <div>
      <p className="mb-1.5 font-medium">
        {t("phone", { ns: "form" })}{" "}
        <span className="font-bold text-red-500">*</span>
      </p>
      <Phone
        className={`
          w-full border rounded-2xl overflow-hidden
          backdrop-blur-md pl-3
          bg-white/10! dark:bg-black/10!
          ${error?.message ? "border-red-500" : "border-black/10 dark:border-white/20"}
          ${!isLogin && "dark:bg-neutral-900/40"}
          transition-all duration-200
        `}
        defaultCountry="uz"
        countries={[["Uzbekistan", "uz", "998", ".. ... .. .."]]}
        forceDialCode
        inputClassName={`
          w-full !bg-transparent
          text-black dark:text-white
          placeholder:text-black/40 dark:placeholder:text-white/30
        `}
        inputProps={{
          inputMode: "numeric",
          autoComplete: "on",
        }}
        {...field}
        onChange={(value) => field.onChange(value.replace(/^\+/, ""))}
      />
      {error?.message && (
        <p className="mt-1 text-xs text-red-500">{t(error.message)}</p>
      )}
    </div>
  );
};