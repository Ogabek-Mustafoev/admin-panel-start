import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  FolderOutlined,
  FolderOpenOutlined,
  TagOutlined,
  DragOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";

import type { ICategory } from "@/schema/category";
import { toSortableId, type UniqueIdentifier } from "../tree-utils";

export interface TreeItemProps {
  item: ICategory;
  depth: number;
  isExpanded: boolean;
  isDragging?: boolean;
  isOver?: boolean;
  isDropTarget?: boolean;
  onToggle: (id: number) => void;
  onAddChild: (item: ICategory) => void;
  onEdit: (item: ICategory) => void;
  onDelete: (id: number) => void;
}

const INDENT = 24;

export const TreeItemContent: React.FC<TreeItemProps & { dragHandleProps?: any }> = ({
  item,
  depth,
  isExpanded,
  isDropTarget,
  isDragging,
  onToggle,
  onAddChild,
  onEdit,
  onDelete,
  dragHandleProps,
}) => {
  const hasChildren = item.children.length > 0;
  const isFolder = hasChildren;

  const menuItems: MenuProps["items"] = isFolder
    ? [
        {
          key: "addChild",
          icon: <FolderAddOutlined />,
          label: "Child qo'shish",
          onClick: () => onAddChild(item),
        },
        {
          key: "edit",
          icon: <EditOutlined />,
          label: "Tahrirlash",
          onClick: () => onEdit(item),
        },
        { type: "divider" },
        {
          key: "delete",
          icon: <DeleteOutlined />,
          label: "O'chirish",
          danger: true,
          onClick: () => onDelete(item.id),
        },
      ]
    : [
        {
          key: "edit",
          icon: <EditOutlined />,
          label: "Tahrirlash",
          onClick: () => onEdit(item),
        },
        { type: "divider" },
        {
          key: "delete",
          icon: <DeleteOutlined />,
          label: "O'chirish",
          danger: true,
          onClick: () => onDelete(item.id),
        },
      ];

  return (
    <div
      className={[
        "group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-200 select-none",
        "border border-transparent hover:border-white/20 hover:bg-white/10 hover:shadow-lg dark:hover:bg-white/5",
        "backdrop-blur-sm",
        isDropTarget ? "bg-blue-400/20 ring-1 ring-blue-400/50" : "",
        isDragging ? "opacity-30 grayscale" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ paddingLeft: `${depth * INDENT + 8}px` }}
      {...dragHandleProps}
    >
      <span className="cursor-grab text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-500 active:cursor-grabbing">
        <DragOutlined style={{ fontSize: 14 }} />
      </span>

      <span
        className="flex shrink-0 cursor-pointer items-center gap-1"
        onClick={() => hasChildren && onToggle(item.id)}
      >
        {isFolder ? (
          isExpanded ? (
            <FolderOpenOutlined style={{ fontSize: 18, color: "#f59e0b" }} />
          ) : (
            <FolderOutlined style={{ fontSize: 18, color: "#f59e0b" }} />
          )
        ) : (
          <TagOutlined style={{ fontSize: 16, color: "#818cf8" }} />
        )}
      </span>

      <span
        className="flex-1 cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200"
        onClick={() => hasChildren && onToggle(item.id)}
      >
        {item.name.uz}
      </span>

      <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
        <Button
          size="small"
          type="text"
          icon={<MoreOutlined />}
          className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={e => e.stopPropagation()}
        />
      </Dropdown>
    </div>
  );
};

export const TreeItem: React.FC<
  TreeItemProps & { activeId: UniqueIdentifier | null; overItemId: UniqueIdentifier | null }
> = ({ item, activeId, overItemId, ...rest }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: toSortableId(item.id),
    data: { type: "category", item },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isDropTarget =
    overItemId !== null && overItemId === toSortableId(item.id) && activeId !== toSortableId(item.id);

  return (
    <div ref={setNodeRef} style={style}>
      <TreeItemContent
        item={item}
        isDragging={isDragging}
        isDropTarget={isDropTarget}
        dragHandleProps={{ ...attributes, ...listeners }}
        {...rest}
      />
    </div>
  );
};

export default TreeItem;
