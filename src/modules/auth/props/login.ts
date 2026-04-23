import { useForm, type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useMutate } from "@/hooks";
import { type TUserField, userResolver } from "@/schema/user.ts";

interface IAuth {
  token: string;
}

export const useLoginProps = () => {
  const { t } = useTranslation();
  const { mutate, isPending } = useMutate<IAuth>();

  const { control, handleSubmit } = useForm<TUserField>({
    resolver: userResolver as Resolver<TUserField>,
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      data,
      method: "POST",
      success: t('successEnter'),
      url: "/auth/admin/login",
      onSuccess: ({ token }) => {
        localStorage.setItem("kidiToken", token);
        window.location.href = "/profile";
      },
    });
  });

  return {
    t,
    control,
    onSubmit,
    isPending,
  };
};
