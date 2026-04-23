import { type AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { toast, type ToastPromiseParams } from "react-toastify";

import { fetchFn } from "@/utils/request";
import { useInvalidate } from "@/hooks";
import { type IFetchingProps } from "@/types";
import { useMutation } from "@tanstack/react-query";

interface IMutationProps<T> extends AxiosRequestConfig, ToastPromiseParams {
  onSuccess?: (data: T) => void;
  fetchProps?: IFetchingProps;
}

export const useMutate = <T>() => {
  const { t } = useTranslation('notifications');
  const invalidate = useInvalidate();

  return useMutation({
    mutationFn: (props: IMutationProps<T>) => {
      const {
        url,
        data,
        params,
        onSuccess,
        fetchProps,
        method = "POST",
        error = t("requestError"),
        success = t("requestSuccess"),
        pending = t("requestProcessing"),
      } = props;

      return toast.promise(
        fetchFn({
          url,
          data,
          params,
          method,
        }).then(({ data }) => {
          if (typeof onSuccess === "function") onSuccess(data as T);
          if (fetchProps) {
            void invalidate(fetchProps);
          }
        }),
        {
          success,
          pending,
          error: { render: ({ data }: any) => `${error}: ${data?.message}` },
        },
      );
    },
  });
};
