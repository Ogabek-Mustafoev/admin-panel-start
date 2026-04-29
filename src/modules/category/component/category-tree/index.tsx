import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { FolderOutlined, TagOutlined } from "@ant-design/icons";

import type { ICategory } from "@/schema/category";
import {
  cloneTree,
  removeNode,
  insertAsChild,
  insertAtRoot,
  findNode,
  flattenTree,
  fromSortableId,
  toSortableId,
} from "../tree-utils";

import { RenderTree } from "../render-tree";
import { useTranslation } from "react-i18next";
import type { TLocale } from "@/types";

interface CategoryTreeProps {
  isFetching?: boolean;
  categoriesData?: ICategory[];
  activeCategoryId?: number | null;
  onAddChild?: (item: ICategory) => void;
  onEdit?: (item: ICategory) => void;
  onDelete?: (item: ICategory) => void;
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({
  isFetching,
  categoriesData,
  activeCategoryId,
  onAddChild,
  onEdit,
  onDelete,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const locale = useTranslation().i18n.language as TLocale;

  useEffect(() => {
    if (categoriesData) {
      setCategories(cloneTree(categoriesData));
    }
  }, [isFetching]);

  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);

  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleToggle = useCallback((id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleAddChild = (item: ICategory) => {
    onAddChild?.(item);
  };

  const handleEdit = (item: ICategory) => {
    onEdit?.(item);
  };

  const handleDelete = (id: number) => {
    const node = findNode(categories, id);
    if (node) {
      onDelete?.(node);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id ?? null);

    if (event.over) {
      const hoveredId = fromSortableId(event.over.id);
      if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
      expandTimerRef.current = setTimeout(() => {
        const node = findNode(categories, hoveredId);
        if (node && node.children && node.children.length > 0) {
          setExpandedIds(prev => new Set([...prev, hoveredId]));
        }
      }, 600);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
    setActiveId(null);
    setOverId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedId = fromSortableId(active.id);
    const targetId = fromSortableId(over.id);

    setCategories(prev => {
      let tree = cloneTree(prev);
      const flat = flattenTree(tree);
      const draggedFlat = flat.find(f => f.item.id === draggedId);
      const targetFlat = flat.find(f => f.item.id === targetId);

      if (!draggedFlat || !targetFlat) return tree;

      const { tree: treeAfterRemove, removed } = removeNode(tree, draggedId);
      if (!removed) return tree;
      tree = treeAfterRemove;

      const targetNode = findNode(tree, targetId);
      const draggedParentId = draggedFlat.parentId;
      const targetParentId = targetFlat.parentId;
      const isSameParent = draggedParentId === targetParentId;

      if (isSameParent) {
        const parentId = draggedParentId;
        const flatAfter = flattenTree(tree);
        const targetFlatAfter = flatAfter.find(f => f.item.id === targetId);
        const newIndex = targetFlatAfter?.index ?? 0;

        if (parentId === null) {
          tree = insertAtRoot(tree, removed, newIndex);
        } else {
          tree = insertAsChild(tree, parentId, removed, newIndex);
        }
      } else {
        if (targetNode && targetNode.children && targetNode.children.length > 0) {
          tree = insertAsChild(tree, targetId, removed);
          setExpandedIds(e => new Set([...e, targetId]));
        } else if (targetNode) {
          tree = insertAsChild(tree, targetId, removed);
          setExpandedIds(e => new Set([...e, targetId]));
        }
      }

      return tree;
    });
  };

  const activeItem = activeId ? findNode(categories, fromSortableId(activeId)) : null;
  const flatItems = flattenTree(categories);
  const allSortableIds = flatItems.map(f => toSortableId(f.item.id));

  return (
    <div className="overflow-x-auto">
      <div className="w-full min-w-min">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={allSortableIds} strategy={verticalListSortingStrategy}>
            <div className="p-2">
              <RenderTree
                items={categories}
                depth={0}
                expandedIds={expandedIds}
                activeId={activeId}
                overItemId={overId}
                activeCategoryId={activeCategoryId as number | undefined}
                onToggle={handleToggle}
                onAddChild={handleAddChild}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </SortableContext>
          <DragOverlay dropAnimation={null}>
            {activeItem && (
              <div className="bg-themeBge blur-bg flex items-center gap-2 rounded-lg px-3 py-2 opacity-95 shadow-xl">
                {activeItem.children && activeItem.children.length > 0 ? (
                  <FolderOutlined className="text-orange-500! text-lg" />
                ) : (
                  <TagOutlined className="text-blue-600! dark:text-blue-500! text-lg" />
                )}
                <span className="text-sm font-medium">{activeItem?.name?.[locale]}</span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};
