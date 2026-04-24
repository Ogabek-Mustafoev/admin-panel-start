import type { FC } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import type { ISelect, TLocale } from "@/types";
import { FaGlobe } from "react-icons/fa6";

const localesData: ISelect<TLocale>[] = [
  { value: "uz", label: "O'zbek" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
];

export const ChangeLocale: FC<{ isLarge?: boolean }> = ({ isLarge }) => {
  const { i18n } = useTranslation("pages");

  const handleLocaleChange = (locale: string) => {
    localStorage.setItem("lng", locale);
    i18n.changeLanguage(locale);
  };

  return (
    <Select
      size={isLarge ? "large" : "middle"}
      variant="borderless"
      styles={{
        popup: {
          root:{
            minWidth:"100px",
          }
        },
      }}
      className="text-white!"
      prefix={<FaGlobe className="mr-1 text-xl" />}
      value={i18n.language}
      options={localesData}
      onChange={handleLocaleChange}
    />
  );
};
