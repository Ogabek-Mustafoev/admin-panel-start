import type { FC } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import type { ISelect, TLocale } from "@/types";

const localesData: ISelect<TLocale>[] = [
  { value: "uz", label: "O'zbek" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
];

export const ChangeLocale: FC = () => {
  const { i18n } = useTranslation("pages");

  const handleLocaleChange = (locale: string) => {
    localStorage.setItem("lng", locale);
    i18n.changeLanguage(locale);
  };

  return (
    <Select
      value={i18n.language}
      options={localesData}
      onChange={handleLocaleChange}
    />
  );
};
