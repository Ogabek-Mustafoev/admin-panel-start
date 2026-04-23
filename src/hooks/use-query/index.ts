import { useSearchParams } from "react-router";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParams = (excludeKeys?: string[]): Record<string, string> => {
    const excludedKeysSet = new Set(excludeKeys);
    const params: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      if (!excludedKeysSet.has(key)) {
        params[key] = value;
      }
    }

    return params;
  };

  const setQueryParams = (
    newQuery: Record<string, string | string[] | null>,
  ): void => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev); // mavjud params saqlanadi

      Object.entries(newQuery).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          updated.delete(key);
        } else if (Array.isArray(value)) {
          updated.delete(key);
          value.forEach((v) => updated.append(key, v)); // array: repeat format
        } else {
          updated.set(key, value);
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
