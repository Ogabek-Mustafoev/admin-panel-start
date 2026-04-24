import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Segmented, theme } from "antd";

import { type TLoginUserField } from "@/schema/user.ts";
import { ChangeLocale, MainInput, PhoneInput } from "@/components";

import { useLoginProps } from "../props/login.ts";

export const Login = () => {
  const { onSubmit, t, control, setValue, isPending, type } = useLoginProps();

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
            <Segmented<TLoginUserField['type']>
              block
              value={type}
              onChange={val => {
                setValue('type', val)
                setValue('contact', "")
              }}
              size="large"
              options={[{
                label: (<div className="flex items-center gap-2"><PhoneFilled /> {t("phone")}</div>), value: "phone"
              }, {
                label: (<div className="flex items-center gap-2"><MailFilled /> {t("email")}</div>), value: "email"
              }]}
            />
            {type === "phone" ? (
              <PhoneInput<TLoginUserField>
                control={control}
                name='contact'
              />
            ) : (
              <MainInput<TLoginUserField>
                required
                size="large"
                type="email"
                name='contact'
                control={control}
                label={t("email")}
                placeholder={t("email")}
              />
            )}
            <MainInput<TLoginUserField>
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
