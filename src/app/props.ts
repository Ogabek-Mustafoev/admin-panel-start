import { useAppSelector, useFetchData } from "@/hooks";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import type { TLocale, IResponse } from "@/types";
import type { IUser } from "@/schema/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn, logOut } from "@/features";
import { useLocation } from "react-router-dom";

export const useAppProps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const { i18n } = useTranslation();
  const locale = i18n.language as TLocale;

  if (document.documentElement.lang !== locale) {
    document.documentElement.lang = locale;
    dayjs.locale(locale === "uz" ? "uz-latn" : locale);
  }

  const savedToken = localStorage.getItem("mediaManageToken");
  const lastPage = localStorage.getItem("lastPage");

  const { data, isFetching, isError } = useFetchData<IResponse<IUser>>({
    enabled: !!savedToken,
    url: `/get-me`,
  });

  useEffect(() => {
    if (!isFetching && data?.data?.id) {
      dispatch(logIn(data?.data));
      if (lastPage && lastPage !== '/') {
        navigate(lastPage);
      } else {
        navigate('/profile');
      }
    } else if (!isFetching && !data?.data?.id) {
      localStorage.clear();
      dispatch(logOut());
      navigate('/login');
    }
    setTimeout(() => setIsLoading(isFetching), 0);
  }, [isFetching, isError]);

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      localStorage.setItem("lastPage", (pathname + search));
    }
  }, [pathname, search]);

  return {
    isLoading,
    isUserExist: !!user?.id,
  };
};
