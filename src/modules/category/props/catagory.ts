import { STATUSES } from "@/constants/data";
import { useInfiniteFetch, useQueryParams } from "@/hooks";
import type { IMeta, IResponse, TLocale } from "@/types";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ICategory } from "@/schema/category";

export const useCategoryProps = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [category, setCategory] = useState<ICategory>();
  const { getQueryParams, setQueryParams } = useQueryParams();

  const params = getQueryParams();

  const fetchingProps = {
    url: `/_a/categories`,
    params: {
      page: 1,
      limit: 10,
      ...params,
    },
  };

  const { data, isFetching, fetchNextPage } = useInfiniteFetch<IResponse<IMeta<ICategory[]>>>(fetchingProps);

  const categories = useMemo(() => {
    return data?.pages?.flatMap(({ data }) => data?.data);
  }, [isFetching, JSON.stringify(params)]);

  const statuses = useMemo(() => {
    return STATUSES.map(({ label, value }) => ({
      value,
      label: t(label),
    }));
  }, [i18n.language]);

  const handleClick = (category?: ICategory, isDelete?: boolean) => {
    setCategory(category);
    if (isDelete) {
      setIsOpen(true);
    } else {
      setIsOpenForm(true);
    }
  };

  const onCancel = (isDelete?: boolean) => {
    setCategory(undefined);
    if (isDelete) {
      setIsOpen(false);
    } else {
      setIsOpenForm(false);
    }
  };

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
    fetchingProps,
    statuses,
    onCancel,
    locale: i18n.language as TLocale,
    query: params.query,
    filterBySearch,
    is_active: params?.is_active ? JSON.parse(params.is_active) : null,
    filterByStatus,
    handleClick,
    isOpen,
    isOpenForm,
    category,
  };
};
