import { type FC, useMemo } from "react";
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

const { darkAlgorithm, defaultAlgorithm } = antdTheme;

export const Providers: FC<IChildren> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,
      },
    },
  });
  const { i18n } = useTranslation();
  const { theme, primaryColor } = useTheme();

  const antLocales: Record<TLocale, Locale> = useMemo(
    () => ({
      uz: uzAntLocale,
      en: enAntLocale,
      ru: ruAntLocale,
    }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        componentSize="large"
        locale={antLocales[i18n?.language as TLocale]}
        theme={{
          algorithm: theme === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimary: primaryColor,
            controlOutlineWidth: 0.5,
          },
          components: {
            Table: {
              fontSize: 16,
            },
            Menu:
              theme === "light"
                ? {
                    itemBg: "#355872",
                    itemColor: "#ffffff",
                    itemHoverColor: "#ffffff",
                    itemSelectedColor: "#ffffff",
                    itemHoverBg: "#5e798e",
                    itemSelectedBg: "#5e798e",
                    subMenuItemSelectedColor: "#64b5f6",
                    subMenuItemBg: "#2d4d63",
                    popupBg: "#355872",
                    darkSubMenuItemBg: "#2d4d63",
                    groupTitleColor: "#a0c4db",
                  }
                : { itemSelectedColor: "white",},
          },
        }}
      >
        <BrowserRouter>
          {children}
          {import.meta.env.MODE === "development" && (
            <ReactQueryDevtools
              buttonPosition="bottom-right"
              initialIsOpen={false}
            />
          )}
          <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
