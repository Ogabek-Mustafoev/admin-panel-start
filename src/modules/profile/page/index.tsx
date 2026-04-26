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
  ColorPicker,
} from "antd";
import {
  SunOutlined,
  MoonOutlined,
  DesktopOutlined,
  SaveOutlined,
  EditOutlined,
  MailOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { MainInput, PhoneInput } from "@/components";
import { useProfileProps } from "../props";
import type { TUserField } from "@/schema/user.ts";
import type { TTheme } from "@/types";
import { PREDEFINED_COLORS } from "@/constants/data";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const ProfilePage: FC = () => {
  const {
    t,
    control,
    onSubmit,
    isPending,
    user,
    handleThemeChange,
    theme,
    bgImage,
    handleUpload,
    handleRemove,
    primaryColor,
    handleColorChange,
  } = useProfileProps();

  return (
    <section className="min-h-full">
      <Title level={3}>{t("myProfile", { ns: "pages" })}</Title>
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
                <Segmented<TTheme>
                  block
                  value={theme}
                  onChange={handleThemeChange}
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
                <Space size={12} wrap>
                  {PREDEFINED_COLORS.map((color) => (
                    <div
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                        primaryColor === color
                          ? "border-white shadow-sm ring-2 ring-[var(--color-primary)]"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {primaryColor === color && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  ))}
                  <ColorPicker
                    value={primaryColor}
                    onChange={(color) => handleColorChange(color.toHexString())}
                  >
                    <div
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                        !PREDEFINED_COLORS.includes(primaryColor)
                          ? "border-white shadow-sm ring-2 ring-[var(--color-primary)]"
                          : "border-gray-200"
                      }`}
                      style={{
                        background:
                          "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                      }}
                    >
                      {!PREDEFINED_COLORS.includes(primaryColor) && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  </ColorPicker>
                </Space>
              </div>
              <div className="mb-6">
                <Text
                  strong
                  className="mb-3 block text-sm tracking-wider text-gray-400 uppercase"
                >
                  {t("background", { ns: "pages" })}
                </Text>
                {bgImage ? (
                  <Button
                    danger
                    block
                    size="large"
                    icon={<DeleteOutlined />}
                    onClick={handleRemove}
                    className="flex items-center justify-center rounded-xl"
                  >
                    {t("removeBackground", { ns: "pages" })}
                  </Button>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      id="bg-upload"
                      hidden
                      accept="image/*"
                      onChange={handleUpload}
                    />
                    <Button
                      block
                      size="large"
                      type="dashed"
                      icon={<UploadOutlined />}
                      onClick={() =>
                        document.getElementById("bg-upload")?.click()
                      }
                      className="flex items-center justify-center rounded-xl"
                    >
                      {t("uploadBackground", { ns: "pages" })}
                    </Button>
                  </div>
                )}
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
                <Col xs={24} md={12}>
                  <MainInput<TUserField>
                    control={control}
                    name="email"
                    label={t("email")}
                    placeholder={t("email")}
                    prefix={<MailOutlined className="mr-2 text-gray-400" />}
                    size="large"
                    required
                  />
                </Col>
                <Col xs={24} md={12}>
                  <PhoneInput<TUserField> control={control} name="phone" />
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
