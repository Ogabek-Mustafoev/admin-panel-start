import { type IFetchingProps } from "@/types";
import { type QueryKey, useQuery } from "@tanstack/react-query";
import { fetchFn } from "@/utils/request";

export const useFetchData = <T>(props: IFetchingProps) => {
  const { url, params, enabled, staleTime = 300000 } = props;
  const queryKey: QueryKey = params ? [url, params] : [url];

  return useQuery<T>({
    enabled,
    queryKey,
    staleTime,
    queryFn: async (context) => {
      try {
        const { data } = await fetchFn({
          url,
          method: "GET",
          signal: context.signal,
        });
        return data as T;
      } catch (err: any) {
        if (err?.code !== "ERR_CANCELED" && err?.message !== "canceled") {
          console.error(err?.message);
        }
        throw err;
      }
    },
  });
};
