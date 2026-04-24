import { Button, Modal } from "antd";
import type { AxiosRequestConfig } from "axios";
import isFunction from "lodash/isFunction";
import { useTranslation } from "react-i18next";
import { RiErrorWarningFill } from "react-icons/ri";

import { useMutate } from "@/hooks";
import type { IFetchingProps, TObject } from "@/types";

interface IDeleteModal<T> extends AxiosRequestConfig {
  title?: string;
  isOpen: boolean;
  isWarning?: boolean;
  cancelText?: string;
  description?: string;
  confirmText?: string;
  fetchProps?: IFetchingProps;
  onErrorDelete?: (err: any) => void;
  onSuccessDelete?: (value?: T) => void;
  onCancel: (isDelete?: boolean) => void;
}

export const DeleteModal = <T = TObject,>(params: IDeleteModal<T>) => {
  const { t } = useTranslation();

  const {
    url,
    data,
    isOpen,
    onCancel,
    fetchProps,
    onSuccessDelete,
    method = "DELETE",
    cancelText = t("cancel"),
    title = t("deletingData"),
    confirmText = t("delete"),
    description = t("confirmDeleting"),
  } = params;
  const { mutate, isPending } = useMutate<T>();

  const handleCancel = () => {
    onCancel(true);
  };

  const onSuccess = (value: T) => {
    if (isFunction(onSuccessDelete)) {
      onSuccessDelete(value);
    }
    handleCancel();
  };

  const handleDelete = () => {
    if (params.isWarning) {
      onSuccess(data as T);
    } else {
      mutate({
        url,
        data,
        method,
        onSuccess,
        fetchProps,
      });
    }
  };

  return (
    <Modal
      centered
      width="400px"
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <div className="wave-loader mx-auto flex h-max w-max items-center justify-center">
        <RiErrorWarningFill className="z-10 h-8 w-8 text-red-500" />
        <div className="loader" />
        <div className="loader" />
      </div>
      <h1 className="mt-4 mb-2 text-center text-lg font-semibold">{title}</h1>
      <p className="mx-auto px-5 text-center leading-tight text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button
          className="bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white"
          onClick={handleCancel}
        >
          {cancelText}
        </Button>
        <Button
          danger
          type="primary"
          loading={isPending}
          onClick={handleDelete}
          className="font-semibold"
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
