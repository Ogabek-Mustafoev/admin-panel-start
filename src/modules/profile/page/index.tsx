import type { FC } from "react";
import { IoIosColorPalette } from "react-icons/io";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Segmented,
  Space,
  Typography,
} from "antd";
import {
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  DesktopOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { MainInput } from "@/components";
import { useProfileProps } from "../props";
import type { TUserField } from "@/schema/user.ts";

const { Title, Text } = Typography;

export const ProfilePage: FC = () => {
  const { t, control, onSubmit, isPending, user } = useProfileProps();

  return (
    <section className="min-h-full">
      <h1 className="mb-4 text-2xl font-semibold">
        {t("myProfile", { ns: "pages" })}
      </h1>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Space orientation="vertical" size={24} className="w-full">
            <Card className="rounded-2xl border-none pt-4 pb-4 text-center shadow-sm">
              <div className="relative mb-4 inline-block">
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className="bg-gray-100 text-gray-400"
                />
              </div>
              <Title level={4} className="mt-2 mb-0">
                {user?.name}
              </Title>
              <Text type="secondary" className="text-xs">
                {user?.position}
              </Text>
            </Card>
            <Card
              title={
                <Space>
                  <IoIosColorPalette className="text-2xl text-green-500" />
                  <span className="text-md font-semibold">
                    {t("appearance", { ns: "pages" })}
                  </span>
                </Space>
              }
              className="rounded-2xl border-none shadow-sm"
            >
              <div className="mb-6">
                <Text
                  strong
                  className="mb-3 block text-sm tracking-wider text-gray-400 uppercase"
                >
                  {t("mode", { ns: "pages" })}
                </Text>
                <Segmented
                  block
                  options={[
                    {
                      label: (
                        <div className="px-1 py-1">
                          <SunOutlined />{" "}
                          <p className="text-sm">
                            {t("light", { ns: "pages" })}
                          </p>
                        </div>
                      ),
                      value: "light",
                    },
                    {
                      label: (
                        <div className="px-1 py-1">
                          <MoonOutlined />{" "}
                          <p className="text-sm">
                            {t("dark", { ns: "pages" })}
                          </p>
                        </div>
                      ),
                      value: "dark",
                    },
                    {
                      label: (
                        <div className="px-1 py-1">
                          <DesktopOutlined />{" "}
                          <p className="text-sm">
                            {t("system", { ns: "pages" })}
                          </p>
                        </div>
                      ),
                      value: "system",
                    },
                  ]}
                />
              </div>

              <div className="mb-6">
                <Text
                  strong
                  className="mb-3 block text-sm tracking-wider text-gray-400 uppercase"
                >
                  {t("colorTheme", { ns: "pages" })}
                </Text>
                <Space size={12}>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-green-500 shadow-sm ring-2 ring-green-500">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <div className="h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                  <div className="h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                  <div className="h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-gray-800 shadow-sm" />
                  <div className="h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-orange-500 shadow-sm" />
                </Space>
              </div>
              <div className="mb-6">
                <Text
                  strong
                  className="mb-3 block text-sm tracking-wider text-gray-400 uppercase"
                >
                  {t("background", { ns: "pages" }) || "ORQA FON"}
                </Text>
                <Space size={12}>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-sm ring-2 ring-gray-800">
                    <div className="h-2 w-2 rounded-full bg-gray-800" />
                  </div>
                  <div className="h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-blue-50 shadow-sm" />
                  <div className="h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-gray-200 shadow-sm" />
                </Space>
              </div>
            </Card>
          </Space>
        </Col>
        <Col xs={24} md={16}>
          <Card
            title={
              <Title level={5} className="text-md mb-0">
                {t("userInformation", { ns: "pages" })}
              </Title>
            }
            className="rounded-2xl border-none shadow-sm"
          >
            <form onSubmit={onSubmit}>
              <Row gutter={[24, 20]}>
                <Col xs={24} md={12}>
                  <MainInput<TUserField>
                    control={control}
                    name="name"
                    label={t("name")}
                    placeholder={t("name")}
                    prefix={<UserOutlined className="mr-2 text-gray-400" />}
                    size="large"
                    required
                  />
                </Col>
                <Col xs={24} md={12}>
                  <MainInput<TUserField>
                    control={control}
                    name="surname"
                    label={t("surname")}
                    placeholder={t("surname")}
                    prefix={<EditOutlined className="mr-2 text-gray-400" />}
                    size="large"
                    required
                  />
                </Col>
                <Col xs={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<SaveOutlined />}
                    loading={isPending}
                    className="mt-4 flex h-12 items-center rounded-xl border-none bg-[#00B448] px-6 font-medium hover:bg-[#00a341]"
                  >
                    {t("saveChanges", { ns: "pages" })}
                  </Button>
                </Col>
              </Row>
            </form>
          </Card>
        </Col>
      </Row>
    </section>
  );
};
