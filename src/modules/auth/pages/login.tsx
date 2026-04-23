import { Button, ConfigProvider, theme } from "antd";

import { type TUserField } from "@/schema/user.ts";
import { ChangeLocale, MainInput } from "@/components";

import { useLoginProps } from "../props/login.ts";

export const Login = () => {
  const { onSubmit, t, control, isPending } = useLoginProps();

  return (
    <section className="from-secondary relative h-full w-full bg-linear-to-b to-indigo-900 text-black">
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <div className="absolute top-5 right-5">
          <ChangeLocale />
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <form
            onSubmit={onSubmit}
            className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-10"
          >
            <div>
              <h1 className="mb-4 text-center text-lg font-medium">
                MEDIA HUB | {t("enter", { ns: "pages" })}
              </h1>
            </div>
            <MainInput<TUserField>
              required
              size="large"
              name='contact'
              control={control}
              label={t("userName")}
              placeholder={t("userName")}
            />
            <MainInput<TUserField>
              required
              size="large"
              type="password"
              name="password"
              control={control}
              placeholder={t("password")}
              label={t("password")}
            />
            <Button
              htmlType="submit"
              className="mt-4"
              loading={isPending}
              size="large"
              type="primary"
            >
              {t("enter", { ns: "pages" })}
            </Button>
          </form>
        </div>
      </ConfigProvider>
    </section>
  );
};
