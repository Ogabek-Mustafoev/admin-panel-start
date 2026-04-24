import { useForm, type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAppSelector, useMutate } from "@/hooks";
import { type IUser, type TUserField, userResolver } from "@/schema/user.ts";
import type { IResponse } from "@/types";

export const useProfileProps = () => {
  const { t } = useTranslation();
  const {user} = useAppSelector((state) => state.auth);

  const { mutate, isPending } = useMutate<IResponse<IUser>>();

  const { control, handleSubmit } = useForm<TUserField>({
    resolver: userResolver as Resolver<TUserField>,
    defaultValues: user,
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      data,
      method: "POST",
      success: t('profileUpdated', { ns: 'notifications' }),
      url: "/profile",
    });
  });

  return {
    t,
    user,
    control,
    onSubmit,
    isPending,
  };
};