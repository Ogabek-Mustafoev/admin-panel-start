import { type IFetchingProps } from "@/types";
import { type QueryKey, useQueryClient } from "@tanstack/react-query";

export const useInvalidate = () => {
  const queryClient = useQueryClient();

  return ({ url, params }: IFetchingProps) => {
    const queryKey: QueryKey = params ? [url, params] : [url];
    return queryClient.invalidateQueries({ queryKey, exact: true });
  };
};
