import { STATUSES } from "@/constants/data";
import { useFetchData, useQueryParams } from "@/hooks";
import type { IResponse, TLocale } from "@/types";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { IFolder } from "@/schema/folder";

const countAll = (nodes: IFolder[]): number => {
  let count = 0;
  for (const node of nodes) {
    count += 1;
    if (node.children?.length) {
      count += countAll(node.children);
    }
  }

  return count;
};

export const useFolderProps = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [folder, setFolder] = useState<IFolder>();
  const { getQueryParams, setQueryParams } = useQueryParams();

  const params = getQueryParams();

  const fetchingProps = {
    url: `/_a/folders/tree`,
    params: {
      page: 1,
      limit: 10,
      ...params,
    },
  };

  const { data, isFetching, isLoading } = useFetchData<IResponse<IFolder[]>>(fetchingProps);

  const foldersCount = useMemo(() => countAll(data?.data || []), [isFetching]);

  const statuses = useMemo(() => {
    return STATUSES.map(({ label, value }) => ({
      value,
      label: t(label),
    }));
  }, [i18n.language]);

  const handleClick = (folder?: IFolder, isDelete?: boolean) => {
    setFolder(folder);
    if (isDelete) {
      setIsOpen(true);
    } else {
      setIsOpenForm(true);
    }
  };

  const onCancel = (isDelete?: boolean) => {
    setFolder(undefined);
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
    isLoading,
    isFetching,
    foldersCount,
    folders: data?.data,
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
    folder,
  };
};
