import { STATUSES } from "@/constants/data";
import { useInfiniteFetch, useQueryParams } from "@/hooks";
import { type TCategoryData } from "@/schema/category";
import type { TLocale } from "@/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useCategoryProps = () => {
  const { t, i18n } = useTranslation();

  const { getQueryParams, setQueryParams } = useQueryParams();
  const params = getQueryParams();
  const { data, isFetching } = useInfiniteFetch<TCategoryData>({
    url: `/_a/categories`,
    params: {
      page: 1,
      limit: 10,
      ...params,
    },
  });

  const categories = useMemo(() => {
    return data?.pages?.flatMap(({ data }) => data?.data);
  }, [isFetching, JSON.stringify(params)]);

  const statuses = useMemo(() => {
    return STATUSES.map(({ label, value }) => ({
      value,
      label: t(label),
    }));
  }, [i18n.language]);

  const filterBySearch = (query: string) => {
    if (query) {
      setQueryParams({ ...params, query, page: 1 });
    } else {
      setQueryParams({ ...getQueryParams(["query"]) });
    }
  };

  const filterByStatus = (is_active: boolean) => {
    if (is_active !== undefined) {
      setQueryParams({ ...params, is_active, page: 1 });
    } else {
      setQueryParams({ ...getQueryParams(["is_active"]) });
    }
  };

  return {
    t,
    categories,
    isFetching,
    statuses,
    locale: i18n.language as TLocale,
    query: params.query,
    filterBySearch,
    is_active: params?.is_active ? JSON.parse(params.is_active) : null,
    filterByStatus,
  };
};
