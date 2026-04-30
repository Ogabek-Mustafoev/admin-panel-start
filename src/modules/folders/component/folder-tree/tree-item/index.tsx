import { useCallback, type FC } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import type { TLocale } from "@/types";
import type { TreeItemProps } from "../types";
import {
  IoChevronForward,
  IoEllipsisVertical,
  IoAddCircleOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoDocumentOutline,
} from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";

export const TreeItem: FC<TreeItemProps> = ({
  item,
  depth,
  isExpanded,
  isActive,
  dropPosition,
  isDropDisabled,
  isDragSource,
  onToggle,
  onAddChild,
  onEdit,
  onDelete,
}) => {
  const { i18n, t } = useTranslation();
  const locale = i18n.language as TLocale;
  const hasChildren = !!item.children?.length;

  const {
    setNodeRef: setDragRef,
    listeners,
    attributes,
  } = useDraggable({
    id: item.id,
    data: { item, depth },
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id: item.id,
    data: { item, depth },
    disabled: isDropDisabled,
  });

  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      setDragRef(node);
      setDropRef(node);
    },
    [setDragRef, setDropRef],
  );

  const removeChildren = (item: TreeItemProps["item"]) => ({
    ...item,
    children: [],
  });

  const menuItems: MenuProps["items"] = [
    {
      key: "add",
      icon: <IoAddCircleOutline className="text-base!" />,
      label: <span className="text-sm">{t("addSubFolder")}</span>,
      onClick({ domEvent }) {
        domEvent.stopPropagation();
        onAddChild?.(removeChildren(item));
      },
    },
    {
      key: "edit",
      icon: <IoPencilOutline className="text-base!" />,
      label: <span className="text-sm">{t("edit")}</span>,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onEdit?.(removeChildren(item));
      },
    },
    { type: "divider" },
    {
      key: "delete",
      icon: <IoTrashOutline className="text-base! text-red-500" />,
      label: <span className="text-sm text-red-500">{t("delete")}</span>,
      onClick({ domEvent }) {
        domEvent.stopPropagation();
        onDelete?.(removeChildren(item));
      },
    },
  ];

  const handleRowClick = () => {
    if (hasChildren) onToggle(item.id);
    onEdit?.(removeChildren(item));
  };

  const isDropInside = dropPosition === "inside";

  return (
    <div ref={mergedRef} className="relative">
      {dropPosition === "before" && <div className="bg-primary absolute top-0 right-0 left-0 z-20 h-0.5" />}
      <div
        onClick={handleRowClick}
        className={[
          "group flex items-center rounded-lg px-2 py-1.5 transition-all duration-200 select-none",
          "border backdrop-blur-sm",
          isActive
            ? "bg-dark/10 border-black/20 shadow-lg dark:border-white/20 dark:bg-white/5"
            : "border-transparent hover:border-white/20 hover:bg-white/10 hover:shadow-lg dark:hover:bg-white/5",
          isDropInside ? "bg-primary/10 ring-primary ring-1" : "",
          isDragSource ? "opacity-30 grayscale" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ marginLeft: `${depth * 24 + 8}px` }}
      >
        <span
          className="cursor-grab text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-500 active:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          <MdDragIndicator style={{ fontSize: 14 }} />
        </span>
        <button
          type="button"
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded transition-transform duration-200 ${hasChildren ? "text-gray-700 hover:text-gray-800 dark:text-gray-300" : "invisible"} ${isExpanded ? "rotate-90" : ""}`}
          onClick={e => {
            e.stopPropagation();
            onToggle(item.id);
          }}
        >
          <IoChevronForward className="h-3.5 w-3.5" />
        </button>
        <span
          className="flex shrink-0 cursor-pointer items-center gap-1"
          onClick={e => {
            e.stopPropagation();
            if (hasChildren) onToggle(item.id);
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <FaRegFolderOpen className="mr-2 ml-1 text-lg text-orange-500!" />
            ) : (
              <FaRegFolder className="mr-2 ml-1 text-lg text-orange-500!" />
            )
          ) : (
            <IoDocumentOutline className="mr-2 ml-1 text-lg text-blue-600! dark:text-blue-500!" />
          )}
        </span>
        <span className="flex-1 cursor-pointer truncate text-sm font-medium text-gray-800 dark:text-gray-200">
          {item?.name?.[locale] || item?.name?.cn}
        </span>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
          <button
            type="button"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={e => e.stopPropagation()}
          >
            <IoEllipsisVertical className="text-base" />
          </button>
        </Dropdown>
      </div>
      {dropPosition === "after" && <div className="bg-primary absolute right-0 bottom-0 left-0 z-20 h-0.5" />}
    </div>
  );
};
