import React, { useState, useCallback, useRef } from "react";
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
import { mockCategories } from "@/constants/data";
import {
  cloneTree,
  removeNode,
  insertAsChild,
  insertAtRoot,
  findNode,
  flattenTree,
  updateNode,
  deleteNode,
  fromSortableId,
  toSortableId,
} from "../tree-utils";

import { RenderTree } from "../render-tree";

export const CategoryTree: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>(cloneTree(mockCategories));
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([1, 2, 6, 9, 10, 13, 14]));

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParent, setModalParent] = useState<ICategory | null>(null);
  const [editingItem, setEditingItem] = useState<ICategory | null>(null);

  // DnD state
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);

  // Timer ref for expand-on-hover
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  // ── Expand/collapse ──
  const handleToggle = useCallback((id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ── Modal handlers ──
  const openAddRoot = () => {
    setModalParent(null);
    setEditingItem(null);
    setModalOpen(true);
  };

  const openAddChild = (item: ICategory) => {
    setModalParent(item);
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: ICategory) => {
    setEditingItem(item);
    setModalParent(null);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories(prev => deleteNode(cloneTree(prev), id));
  };

  const handleModalSubmit = (cat: ICategory) => {
    setCategories(prev => {
      const tree = cloneTree(prev);
      if (editingItem) {
        return updateNode(tree, cat.id, cat);
      }
      if (modalParent) {
        const result = insertAsChild(tree, modalParent.id, cat);
        setExpandedIds(e => new Set([...e, modalParent.id]));
        return result;
      }
      return [cat, ...tree];
    });
    setModalOpen(false);
  };

  // ── DnD ──
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
        if (node && node.children.length > 0) {
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
        if (targetNode && targetNode.children.length > 0) {
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
                onToggle={handleToggle}
                onAddChild={openAddChild}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            </div>
          </SortableContext>
          <DragOverlay dropAnimation={null}>
            {activeItem && (
              <div className="bg-theme blur-bg flex items-center gap-2 rounded-lg px-3 py-2 opacity-95 shadow-xl">
                {activeItem.children.length > 0 ? (
                  <FolderOutlined style={{ fontSize: 16, color: "#f59e0b" }} />
                ) : (
                  <TagOutlined style={{ fontSize: 14, color: "#818cf8" }} />
                )}
                <span className="text-sm font-medium">{activeItem.name.uz}</span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};
