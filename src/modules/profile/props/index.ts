import { useForm, type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector, useMutate, useTheme } from "@/hooks";
import {
  type IUser,
  type TUserField,
  userUpdateResolver,
} from "@/schema/user.ts";
import type { IResponse } from "@/types";
import { saveBackground, removeBackgroundFromDB } from "@/utils/db";
import { setBgImage, logIn, setBgColor } from "@/features";
import { PREDEFINED_BG_COLORS } from "@/constants/data";

export const useProfileProps = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const { bgImage } = useAppSelector((state) => state.theme);
  const {
    theme,
    primaryColor,
    bgColor,
    handleThemeChange,
    handleColorChange,
    handleBgColorChange,
  } = useTheme();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutate<IResponse<IUser>>();

  const { control, handleSubmit } = useForm<TUserField>({
    resolver: userUpdateResolver as Resolver<TUserField>,
    defaultValues: user,
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      data,
      method: "PATCH",
      onSuccess: ({ data }) => {
        dispatch(logIn(data));
      },
      success: t("profileUpdated", { ns: "notifications" }),
      url: "/profile",
    });
  });

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const data = await saveBackground(file);
      dispatch(setBgImage(data));
    }
  };

  const handleRemove = async () => {
    await removeBackgroundFromDB();
    dispatch(setBgImage(null));
    dispatch(setBgColor(null));
  };

  const availableBgColors = theme !== "light"
    ? PREDEFINED_BG_COLORS.dark
    : PREDEFINED_BG_COLORS.light;

  return {
    t,
    user,
    theme,
    bgImage,
    bgColor,
    primaryColor,
    control,
    onSubmit,
    isPending,
    handleUpload,
    handleRemove,
    availableBgColors,
    handleThemeChange,
    handleColorChange,
    handleBgColorChange,
  };
};
