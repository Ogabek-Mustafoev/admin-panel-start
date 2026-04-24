import get from "lodash/get";
import uniqueBy from "lodash/uniqBy";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";
import { Select, type SelectProps, Spin } from "antd";
import {type UIEvent, useEffect, useMemo, useState } from "react";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";

import { useInfiniteFetch } from "@/hooks";
import type { IResponse, IInitialData, ISelect, TLocale, TObject } from "@/types";

interface ICustomSelect<T extends FieldValues> extends UseControllerProps<T> {
  url?: string;
  label?: string;
  getKey?: string;
  params?: TObject;
  enabled?: boolean;
  required?: boolean;
  className?: string;
  placeholder: string;
  secondLabel?: string;
  optionLabel?: string;
  optionValue?: string;
  isSaveOption?: boolean;
  isSearchable?: boolean;
  staticData?: ISelect[];
  mode?: SelectProps['mode'];
  labels?: Record<TLocale, string>;
}

export const CustomSelect = <T extends FieldValues>(props: ICustomSelect<T>) => {
  const {
    url,
    mode,
    label,
    params,
    enabled,
    required,
    labels,
    disabled,
    className,
    staticData,
    placeholder,
    getKey = "data",
    optionValue = 'id',
    isSaveOption = true,
    optionLabel = 'name',
    isSearchable = false,
    ...rest
  } = props;
  const { t, i18n } = useTranslation("errors");

  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { field, fieldState: { error, invalid } } = useController(rest);
  const { data, fetchNextPage, isFetching } = useInfiniteFetch<IInitialData[] | IResponse<IInitialData[]>>({
    url,
    params: {
      ...params,
      page: 1,
      pageSize: 30,
      ...(isSearchable ? { search } : {}),
    },
    enabled: enabled ?? (isFocused && !!url),
  });

  const locale = i18n.language as TLocale;

  const options = useMemo(() => {
    const converted = data?.pages?.flatMap(item => {
      if (Array.isArray(item)) {
        return item.map(option => ({
          value: get(option, optionValue),
          label: get(option, labels?.[locale] ?? optionLabel),
        }))
      } else {
        return get(item, getKey, [])?.map(option => ({
          value: get(option, optionValue),
          label: get(option, labels?.[locale] ?? optionLabel),
        }))
      }
    }) ?? [];

    return uniqueBy(converted, 'value');
  }, [isFetching, search, locale]);

  const handlePopupScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if ((scrollHeight - scrollTop) <= clientHeight + 1) {
      void fetchNextPage();
    }
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      if (isSearchable && term) {
        setSearch(term)
      }
    }, 500);
    debouncedSearch();

    return () => debouncedSearch.cancel();
  }, [term]);

  return (
    <div className={className}>
      {label && (
        <p className={`${disabled && "opacity-50 cursor-not-allowed"} mb-1.5 font-medium`}>
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </p>
      )}
      <Select
        {...field}
        onChange={isSaveOption ? (_, option) => {
          field.onChange(option)
        } : field?.onChange}
        allowClear
        mode={mode}
        showSearch
        size="large"
        className="w-full"
        notFoundContent={
          isFetching ? <Spin className="w-full py-8" /> : undefined
        }
        disabled={disabled}
        searchValue={term}
        loading={isFetching}
        maxTagCount="responsive"
        placeholder={placeholder}
        onPopupScroll={handlePopupScroll}
        options={staticData ?? options}
        onClear={() => setSearch(term)}
        onFocus={() => setIsFocused(true)}
        status={invalid ? "error" : undefined}
        onSearch={(term) => setTerm(term)}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      {invalid && (
        <p className="text-xs text-red-500">{t(error?.message ?? (error as any)?.value?.message)}</p>
      )}
    </div>
  )
}