import { type FC } from "react";
import type { IChildren, TLocale } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks";
import uzAntLocale from "antd/locale/uz_UZ";
import ruAntLocale from "antd/locale/ru_RU";
import enAntLocale from "antd/locale/en_US";
import type { Locale } from "antd/es/locale";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme as antdTheme } from "antd";
import { GLASS, SOLID } from "@/constants/data";
import { useAppSelector } from "@/hooks";

const { darkAlgorithm, defaultAlgorithm } = antdTheme;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 300000 },
  },
});

const antLocales: Record<TLocale, Locale> = {
  uz: uzAntLocale,
  en: enAntLocale,
  ru: ruAntLocale,
};

export const Providers: FC<IChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const { theme, primaryColor } = useTheme();
  const { bgImage } = useAppSelector((state) => state.theme);

  const isLight = theme === "light";
  const themeSet = bgImage ? GLASS : SOLID;
  const g = isLight ? themeSet.light : themeSet.dark;

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        componentSize="large"
        locale={antLocales[i18n?.language as TLocale]}
        theme={{
          algorithm: isLight ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimary: primaryColor,
            controlOutlineWidth: 0.5,
            colorBgContainer: g.bg,
            colorBgElevated: g.bgElevated,
            borderRadius: 16,
            boxShadow: g.boxShadow,
          },
          components: {
            Button: {
              borderRadius: 7,
            },
            Card: {
              colorBorderSecondary: g.border,
            },
            Table: {
              colorBgContainer: g.bg,
              colorBorder: g.border,
              colorBorderSecondary: g.border,
            },
            Modal: {
              contentBg: g.bgElevated,
              headerBg: "transparent",
              footerBg: "transparent",
              colorBorderSecondary: g.border,
            },
            Segmented: {
              itemSelectedBg: g.menuSelectedBg,
              trackBg: g.bg,
            },
            Drawer: {
              colorBgElevated: g.bgElevated,
            },
            Dropdown: {
              colorBgElevated: g.menuPopupBg,
            },
            Select: {
              colorBgElevated: g.menuPopupBg,
              colorBgContainer: g.bg,
            },
            DatePicker: {
              colorBgContainer: g.bg,
              colorBgElevated: g.menuPopupBg,
            },
            Input: {
              colorBgContainer: g.bg,
            },
            Menu: {
              itemBg: "transparent",
              itemColor: isLight ? "#ffffff" : undefined,
              itemHoverColor: isLight ? "#ffffff" : undefined,
              itemSelectedColor: isLight ? "#ffffff" : "#ffffff",
              itemHoverBg: g.menuHoverBg,
              itemSelectedBg: g.menuSelectedBg,
              subMenuItemSelectedColor: "#64b5f6",
              subMenuItemBg: g.menuSubBg,
              popupBg: g.menuPopupBg,
              darkSubMenuItemBg: g.menuSubBg,
              groupTitleColor: g.menuGroupTitle,
            },
          },
        }}
      >
        <BrowserRouter>
          {children}
          {import.meta.env.MODE === "development" && (
            <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
          )}
          <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
