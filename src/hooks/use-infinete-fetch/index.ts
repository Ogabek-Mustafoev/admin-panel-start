import type {IFetchingProps, IMeta} from "@/types";
import { fetchFn } from "@/utils/request";
import {type QueryKey, useInfiniteQuery} from "@tanstack/react-query";

export const useInfiniteFetch = <T = IMeta>(props: IFetchingProps) => {
  const {url, params, enabled} = props;
  const queryKey: QueryKey = params ? [url, params] : [url];

  return useInfiniteQuery<T>({
    enabled,
    queryKey,
    queryFn: async ({pageParam, signal}): Promise<T> => {
      try {
        const {data} = await fetchFn.get<T>(url!, {
          params: {
            ...params,
            page: pageParam!,
          },
          signal,
        });
        return data;
      } catch (err: any) {
        if (err?.code !== "ERR_CANCELED" && err?.message !== "canceled") {
          console.error(err?.message);
        }
        throw err;
      }
    },
    initialPageParam: params?.page,
    getNextPageParam: (lastPage: any, allPages) => {
      const lastPageNumber = allPages?.length;
      const totalPageCount = Math.ceil((lastPage?.meta?.total ?? 1000) / (params?.pageSize as number));
      return lastPageNumber < totalPageCount ? lastPageNumber + 1 : undefined;
    },
  })
}