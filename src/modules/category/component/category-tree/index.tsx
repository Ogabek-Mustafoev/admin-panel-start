import { type FC, useState, useCallback, useEffect, useRef } from "react";
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
} from "@dnd-kit/core";
import type { ICategory } from "@/schema/category";
import type { CategoryTreeProps, DropPosition, ITreeHistoryEntry } from "./types";
import { TreeItem } from "./tree-item";

import { FaRegFolder } from "react-icons/fa";
import { cloneTree, findItemById, findItemContext, removeItem, findParentId, collectDescendantIds } from "./utils";
import { useTranslation } from "react-i18next";
import type { TLocale } from "@/types";
import { MdDragIndicator } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";

export const CategoryTree: FC<CategoryTreeProps> = ({
  isFetching,
  categoriesData,
  activeCategoryId,
  onAddChild,
  onEdit,
  onDelete,
}) => {
  const [treeData, setTreeData] = useState<ICategory[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [_treeHistory, setTreeHistory] = useState<ITreeHistoryEntry[]>([]);
  const locale = useTranslation().i18n.language as TLocale;

  // DnD state
  const [activeItem, setActiveItem] = useState<ICategory | null>(null);
  const [overId, setOverId] = useState<number | null>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition | null>(null);
  const [invalidDropIds, setInvalidDropIds] = useState<Set<number>>(new Set());

  // Auto-expand timer
  const autoExpandTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastOverId = useRef<number | null>(null);

  // Sync props → local state
  useEffect(() => {
    if (categoriesData) {
      setTreeData(cloneTree(categoriesData));
    }
  }, [isFetching]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleToggle = useCallback((id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // ─── Compute drop position from pointer vs over-element rect ───
  const computeDropPosition = (event: DragOverEvent | DragEndEvent): DropPosition | null => {
    if (!event.over) return null;
    const overRect = event.over.rect;
    const translated = event.active.rect.current.translated;
    if (!translated || !overRect) return null;

    const pointerY = translated.top + translated.height / 2;
    const relY = (pointerY - overRect.top) / overRect.height;

    if (relY < 0.25) return "before";
    if (relY > 0.75) return "after";
    return "inside";
  };

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = event.active.id as number;
      const item = findItemById(treeData, id);
      if (!item) return;

      const descendants = collectDescendantIds(item);
      descendants.add(id);
      setInvalidDropIds(descendants);
      setActiveItem(item);
    },
    [treeData],
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { over } = event;
      const currentOverId = over ? (over.id as number) : null;

      if (!currentOverId || invalidDropIds.has(currentOverId)) {
        setOverId(null);
        setDropPosition(null);
        clearAutoExpand();
        return;
      }

      setOverId(currentOverId);
      setDropPosition(computeDropPosition(event));

      // Auto-expand: hover over a collapsed folder for 600ms
      if (currentOverId !== lastOverId.current) {
        clearAutoExpand();
        lastOverId.current = currentOverId;

        const overItem = findItemById(treeData, currentOverId);
        if (overItem?.children?.length && !expandedIds.has(currentOverId)) {
          autoExpandTimer.current = setTimeout(() => {
            setExpandedIds(prev => new Set(prev).add(currentOverId));
          }, 600);
        }
      }
    },
    [treeData, expandedIds, invalidDropIds],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const pos = computeDropPosition(event);

      resetDragState();

      if (!over || !pos) return;

      const activeId = active.id as number;
      const targetId = over.id as number;

      if (activeId === targetId || invalidDropIds.has(targetId)) return;

      setTreeData(prev => {
        const tree = cloneTree(prev);
        const oldParentId = findParentId(tree, activeId) ?? null;
        const oldCtx = findItemContext(tree, activeId);
        const oldIndex = oldCtx?.index ?? -1;

        const draggedItem = removeItem(tree, activeId);
        if (!draggedItem) return prev;

        if (pos === "inside") {
          // ── NESTING: make child of target ──
          const targetItem = findItemById(tree, targetId);
          if (!targetItem) return prev;

          draggedItem.parent_id = targetId;
          if (!targetItem.children) targetItem.children = [];
          targetItem.children.push(draggedItem);

          // Auto-expand the target so user sees the result
          setExpandedIds(s => new Set(s).add(targetId));

          pushHistory(activeId, oldParentId, targetId, oldIndex, targetItem.children.length - 1);
        } else {
          // ── REORDER: insert before/after target ──
          const targetCtx = findItemContext(tree, targetId);
          if (!targetCtx) return prev;

          const newParentId = findParentId(tree, targetId) ?? null;
          draggedItem.parent_id = newParentId;

          const insertAt = pos === "before" ? targetCtx.index : targetCtx.index + 1;
          targetCtx.parent.splice(insertAt, 0, draggedItem);

          pushHistory(activeId, oldParentId, newParentId, oldIndex, insertAt);
        }

        return tree;
      });
    },
    [invalidDropIds],
  );

  const handleDragCancel = useCallback(() => resetDragState(), []);

  // ─── Helpers ───

  const clearAutoExpand = () => {
    if (autoExpandTimer.current) {
      clearTimeout(autoExpandTimer.current);
      autoExpandTimer.current = null;
    }
  };

  const resetDragState = () => {
    setActiveItem(null);
    setOverId(null);
    setDropPosition(null);
    setInvalidDropIds(new Set());
    clearAutoExpand();
    lastOverId.current = null;
  };

  const pushHistory = (
    itemId: number,
    oldParentId: number | null,
    newParentId: number | null,
    oldIndex: number,
    newIndex: number,
  ) => {
    setTreeHistory(h => [...h, { itemId, oldParentId, newParentId, oldIndex, newIndex }]);
  };

  // ─── Recursive Render ───

  const renderItems = (items: ICategory[], depth = 0) =>
    items.map(item => {
      const isExpanded = expandedIds.has(item.id);
      const isActive = item.id === activeCategoryId;
      const isDragSource = item.id === activeItem?.id;
      const itemDropPos = item.id === overId ? dropPosition : null;
      const isDropDisabled = invalidDropIds.has(item.id);

      return (
        <div key={item.id}>
          <TreeItem
            item={item}
            depth={depth}
            isExpanded={isExpanded}
            isActive={isActive}
            dropPosition={itemDropPos}
            isDropDisabled={isDropDisabled}
            isDragSource={isDragSource}
            onToggle={handleToggle}
            onAddChild={onAddChild}
            onEdit={onEdit}
            onDelete={onDelete}
          />
              {isExpanded && item?.children?.length ? (
            <div className="relative">
              <div
                className="bg-themeBg absolute top-2 bottom-2 w-px dark:bg-white/6"
                style={{ left: `${depth * 20 + 22}px` }}
              />
              {renderItems(item.children, depth + 1)}
            </div>
          ) : null}
        </div>
      );
    });

  return (
    <div className="overflow-x-hidden overflow-y-auto pb-20" style={{ maxHeight: "calc(100vh - 140px)" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {renderItems(treeData)}
        <DragOverlay dropAnimation={null}>
          {activeItem && (
            <div className="bg-themeBge blur-bg flex items-center gap-2 rounded-lg px-3 py-2 opacity-95 shadow-xl">
              <MdDragIndicator style={{ fontSize: 14 }} />
              {activeItem.children && activeItem.children.length > 0 ? (
                <FaRegFolder className="text-lg text-orange-500!" />
              ) : (
                <IoDocumentOutline className="text-lg text-blue-600! dark:text-blue-500!" />
              )}
              <span className="text-sm font-medium">{activeItem?.name?.[locale]}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
