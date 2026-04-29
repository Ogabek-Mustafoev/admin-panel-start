import { type FC, useEffect, useMemo } from "react";
import { Button } from "antd";
import type { IFetchingProps } from "@/types";
import { categoryResolver, type ICategory, type TCategoryField } from "@/schema/category";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks";
import { useForm, type Resolver } from "react-hook-form";
import { CustomSelect, MainInput, UploadFile } from "@/components";
import { STATUSES } from "@/constants/data";

interface ICatalogForm {
  fetchingProps?: IFetchingProps;
  onAction: () => void;
  isFetching?: boolean;
  category?: ICategory;
}

export const CatalogForm: FC<ICatalogForm> = ({ fetchingProps, isFetching, onAction, category }) => {
  const { t, i18n } = useTranslation();
  const { mutate, isPending } = useMutate();

  const { handleSubmit, reset, unregister, control, setValue } = useForm<TCategoryField>({
    resolver: categoryResolver as Resolver<TCategoryField>,
  });

  const resetDefault = (values?: Partial<TCategoryField>) => {
    unregister();
    reset({
      name: { en: "", ru: "", uz: "" },
      image_url: "",
      mobile_image_url: "",
      parent_id: values?.parent_id ?? null,
      is_active: true,
    });
  };

  const onClose = () => {
    resetDefault();
    onAction();
  };

  const onSubmit = handleSubmit(data => {
    mutate({
      data,
      method: category?.id ? "PUT" : "POST",
      onSuccess: onClose,
      fetchProps: fetchingProps,
      url: category?.id ? `/_a/categories/${category.id}` : "/_a/categories",
    });
  });

  const statuses = useMemo(() => {
    return STATUSES.map(({ label, value }) => ({
      value,
      label: t(label),
    }));
  }, [i18n.language]);

  useEffect(() => {
    if (category?.id) {
      reset(category);
    } else {
      resetDefault({ parent_id: category?.parent_id });
    }
  }, [isFetching, category?.id, category?.parent_id]);

  return (
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2">
      <div className={`blur-bg bg-themeBg grid gap-3 rounded-2xl p-3`}>
        <p className={`font-medium`}>
          {t("name", { ns: "table" })} <span className="font-bold text-red-500">*</span>
        </p>
        <MainInput<TCategoryField>
          required
          addonBefore="UZ"
          name="name.uz"
          size="large"
          control={control}
          onCopy={val => setValue("name", val)}
          placeholder={t("name", { ns: "table", lng: "uz" })}
        />
        <MainInput<TCategoryField>
          required
          name="name.ru"
          size="large"
          control={control}
          addonBefore="RU"
          placeholder={t("name", { ns: "table", lng: "ru" })}
        />
        <MainInput<TCategoryField>
          required
          addonBefore="EN"
          name="name.en"
          size="large"
          control={control}
          placeholder={t("name", { ns: "table", lng: "en" })}
        />
        {category?.id && (
          <CustomSelect<TCategoryField>
            required
            isSaveOption={false}
            name="is_active"
            control={control}
            staticData={statuses}
            label={t("status")}
            placeholder={t("status")}
          />
        )}
      </div>
      <div className="blur-bg bg-themeBg flex flex-col gap-3 rounded-2xl p-3">
        <UploadFile<TCategoryField> required name="image_url" control={control} label={t("image", { ns: "pages" })} />
        <UploadFile<TCategoryField> required name="mobile_image_url" control={control} label={t("mobilePhoto")} />
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button onClick={onClose} size="large" htmlType="button" danger>
          {t("cancel")}
        </Button>
        <Button loading={isPending} size="large" type="primary" htmlType="submit">
          {t("save")}
        </Button>
      </div>
    </form>
  );
};
