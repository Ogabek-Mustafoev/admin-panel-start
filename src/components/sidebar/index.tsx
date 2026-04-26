import { useMemo, useState, type FC } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Button, Dropdown, Menu, type DropDownProps } from "antd";
import { LiaArrowsAltVSolid } from "react-icons/lia";
import { useAppDispatch, useAppSelector, useFilterRoutes } from "@/hooks";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { logOut, toggleCollapse } from "@/features";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ChangeLocale } from "../change-locale";
import { DeleteModal } from "../delete-modal";

export const Sidebar: FC = () => {
  const { t, i18n } = useTranslation("pages");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const { sideBarLinks } = useFilterRoutes();
  const { isCollapsed } = useAppSelector(state => state.collapse);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
    navigate("/login");
  };

  const menuLinks = useMemo(
    () =>
      sideBarLinks?.map(({ path, icon: Icon, name }) => ({
        key: path,
        label: <Link to={path}>{t(name as string)}</Link>,
        icon: Icon ? <Icon className="h-6 w-6" /> : undefined,
      })),
    [sideBarLinks?.length, i18n.language],
  );

  const items: DropDownProps["menu"]["items"] = [
    {
      key: "1",
      label: (
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold">{user?.name}</h3>
          <p className="text-xs text-gray-600">{user?.email}</p>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <Link to="/profile" className="flex items-center gap-3">
          <FiUser className="h-4 w-4 text-gray-600" />
          <p>{t("myProfile")}</p>
        </Link>
      ),
    },
    { type: "divider" },
    {
      key: "3",
      label: (
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full cursor-pointer items-center gap-3 border-none! text-red-600 shadow-none!"
        >
          <FiLogOut className="h-4 w-4" />
          <p className="text-md">Log Out</p>
        </button>
      ),
    },
  ];

  return (
    <>
      <aside
        className={`${isCollapsed ? "w-20" : "w-72"} dark:bg-dark-theme flex flex-col gap-4 bg-[#355872] transition-[width] duration-500`}
      >
        <div className="flex items-center justify-between gap-2 overflow-hidden border-b border-white/10 p-4 pr-2">
          {!isCollapsed && <h1 className="text-2xl font-extralight text-nowrap text-white">MEDIA HUB</h1>}
          <Button
            className="ml-auto shadow-none!"
            type="primary"
            size="large"
            onClick={() => dispatch(toggleCollapse())}
          >
            {isCollapsed ? (
              <TbLayoutSidebarRightCollapse className="text-2xl" />
            ) : (
              <TbLayoutSidebarLeftCollapse className="text-2xl" />
            )}
          </Button>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          className="flex-1"
          inlineCollapsed={isCollapsed}
          tooltip={isCollapsed ? { placement: "left" } : false}
          items={menuLinks}
        />
        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 p-4">
          <ChangeLocale isLarge />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button className="px-2! py-6! shadow-none!" size="large" type="primary">
              <div className="flex items-center gap-2">
                <FiUser className="rounded-md bg-white/10 p-2 text-4xl" />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <h3 className="text-md">{user?.name}</h3>
                    <p className="text-xs text-white/70">{user?.email}</p>
                  </div>
                )}
              </div>
              <LiaArrowsAltVSolid className="ml-auto text-xl" />
            </Button>
          </Dropdown>
        </div>
        <DeleteModal
          isWarning
          method="POST"
          isOpen={isOpen}
          onSuccessDelete={handleLogout}
          title={t("logout", { ns: "form" })}
          onCancel={() => setIsOpen(false)}
          confirmText={t("logout", { ns: "form" })}
          description={t("confirmLogout", { ns: "form" })}
        />
      </aside>
    </>
  );
};
