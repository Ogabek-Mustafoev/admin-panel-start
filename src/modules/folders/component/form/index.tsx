import { type FC, useEffect } from "react";
import { Button } from "antd";
import type { IFetchingProps } from "@/types";
import { folderResolver, type IFolder, type TFolderField } from "@/schema/folder";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks";
import { useForm, type Resolver } from "react-hook-form";
import { MainInput } from "@/components";

interface IFolderForm {
  fetchingProps?: IFetchingProps;
  onAction: () => void;
  isFetching?: boolean;
  folder?: IFolder;
}

export const FolderForm: FC<IFolderForm> = ({ fetchingProps, isFetching, onAction, folder }) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useMutate();

  const { handleSubmit, reset, unregister, control, setValue, watch, getValues } = useForm<TFolderField>({
    resolver: folderResolver as Resolver<TFolderField>,
  });

  const resetDefault = (values?: Partial<TFolderField>) => {
    unregister();
    reset({
      name: { en: "", ru: "", uz: "" },
      parent_id: values?.parent_id ?? null,
    });
  };

  console.log(watch());

  const onClose = () => {
    resetDefault();
    onAction();
  };

  const onSubmit = handleSubmit(data => {
    mutate({
      data,
      method: folder?.id ? "PUT" : "POST",
      onSuccess: onClose,
      fetchProps: fetchingProps,
      url: folder?.id ? `/_a/folders/${folder.id}` : "/_a/folders",
    });
  });

  useEffect(() => {
    if (folder?.id) {
      reset(folder);
    } else {
      resetDefault({ parent_id: folder?.parent_id });
    }
  }, [isFetching, folder?.id, folder?.parent_id]);

  return (
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2">
      <div className="blur-bg bg-themeBg grid gap-3 rounded-2xl p-3">
        <MainInput<TFolderField>
          required
          addonBefore="CN"
          name="name.cn"
          size="large"
          control={control}
          placeholder={t("name", { ns: "table", lng: "cn" })}
        />
        <MainInput<TFolderField>
          required
          addonBefore="UZ"
          name="name.uz"
          size="large"
          control={control}
          onCopy={val => setValue("name", { ...getValues("name"), ...val })}
          placeholder={t("name", { ns: "table", lng: "uz" })}
        />
        <MainInput<TFolderField>
          required
          name="name.ru"
          size="large"
          control={control}
          addonBefore="RU"
          placeholder={t("name", { ns: "table", lng: "ru" })}
        />
        <MainInput<TFolderField>
          required
          addonBefore="EN"
          name="name.en"
          size="large"
          control={control}
          placeholder={t("name", { ns: "table", lng: "en" })}
        />
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button onClick={onClose} size="large" htmlType="button" type="primary" danger>
          {t("cancel")}
        </Button>
        <Button loading={isPending} size="large" type="primary" htmlType="submit">
          {t("save")}
        </Button>
      </div>
    </form>
  );
};
