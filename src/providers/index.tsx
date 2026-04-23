import { type FC, useEffect, useMemo } from "react";
import type { IChildren, TLocale } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks";
import uzAntLocale from "antd/locale/uz_UZ";
import ruAntLocale from "antd/locale/ru_RU";
import enAntLocale from "antd/locale/en_US";
import type { Locale } from "antd/es/locale";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setTheme } from "@/features";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const Providers: FC<IChildren> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,
      },
    },
  });
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state) => state.theme);

  const antLocales: Record<TLocale, Locale> = useMemo(
    () => ({
      uz: uzAntLocale,
      en: enAntLocale,
      ru: ruAntLocale,
    }),
    [],
  );

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      dispatch(setTheme(true));
    } else {
      dispatch(setTheme(false));
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={antLocales[i18n?.language as TLocale]}
        theme={{
          token: {
            colorPrimary: "#355872",
            controlOutlineWidth: 0.5,
          },
          components: {
            Table: {
              fontSize: 16,
            },
            Menu: {
              fontSize: 16,
            },
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
          <ToastContainer theme={isDark ? "dark" : "light"} />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
