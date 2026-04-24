import { useForm, type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useMutate } from "@/hooks";
import { type IUser, type TLoginUserField, loginUserResolver } from "@/schema/user.ts";
import type { IResponse } from "@/types";

interface IAuth {
  access_token: string;
  type: string;
  user: IUser
}

export const useLoginProps = () => {
  const { t } = useTranslation();
  const { mutate, isPending } = useMutate<IResponse<IAuth>>();

  const { control, handleSubmit, watch, setValue } = useForm<TLoginUserField>({
    resolver: loginUserResolver as Resolver<TLoginUserField>,
    defaultValues: {
      type: "phone",
      contact: "998907291129",
      password: "password",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      data,
      method: "POST",
      success: t('successEnter', { ns: 'notifications' }),
      url: "/login",
      onSuccess: ({ data }) => {
        localStorage.setItem("mediaManageToken", data?.access_token);
        window.location.href = "/profile"
      },
    });
  });

  return {
    t,
    control,
    onSubmit,
    isPending,
    type: watch('type'),
    setValue
  };
};
