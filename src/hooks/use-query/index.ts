import type { TObject } from "@/types";
import { useSearchParams } from "react-router";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParams = (excludeKeys?: string[]): Record<string, string> => {
    const excludedKeysSet = new Set(excludeKeys);
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      if (!excludedKeysSet.has(key)) {
        params[key] = value;
      }
    });

    return params;
  };

  const setQueryParams = (newQuery: TObject): void => {
    setSearchParams(() => {
      const updated = new URLSearchParams();

      Object.entries(newQuery).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (Array.isArray(value)) {
          value.forEach(v => updated.append(key, v));
        } else {
          updated.set(key, String(value));
        }
      });

      return updated;
    });
  };

  return {
    getQueryParams,
    setQueryParams,
  };
};
