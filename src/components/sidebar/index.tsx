import type { FC } from "react";
import { useAppDispatch, useAppSelector, useMatchMedia } from "@/hooks";
import { setCollapse } from "@/features";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

export const Sidebar: FC = () => {
  const isXL = useMatchMedia(1280);

  const dispatch = useAppDispatch();
  const { isCollapsed } = useAppSelector((state) => state.collapse);

  const items = [
    { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
    { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
    { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
    {
      key: "sub1",
      label: "Navigation One",
      icon: <MailOutlined />,
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {!isXL && !isCollapsed && (
        <div
          onClick={() => dispatch(setCollapse(true))}
          className="bg-opacity-30 fixed z-10 h-full w-full bg-black backdrop-blur-sm"
        />
      )}
      <aside
        className={`${isCollapsed ? "w-20" : "w-72"} flex flex-col gap-4 transition-[width] duration-500`}
      >
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-3xl font-bold">MEDIA HUB</h1>
          {isCollapsed ? (
            <TbLayoutSidebarRightCollapse />
          ) : (
            <TbLayoutSidebarLeftCollapse />
          )}
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          className="flex-1"
          mode="inline"
          theme="dark"
          inlineCollapsed={isCollapsed}
          tooltip={isCollapsed ? { placement: "left" } : false}
          items={items}
        />
      </aside>
    </>
  );
};
