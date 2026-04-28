import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { ICategory } from "@/schema/category";
import { toSortableId } from "../tree-utils";
import { TreeItem } from "../tree-item";

interface RenderTreeProps {
  items: ICategory[];
  depth: number;
  expandedIds: Set<number>;
  activeId: UniqueIdentifier | null;
  overItemId: UniqueIdentifier | null;
  onToggle: (id: number) => void;
  onAddChild: (item: ICategory) => void;
  onEdit: (item: ICategory) => void;
  onDelete: (id: number) => void;
}

export const RenderTree: React.FC<RenderTreeProps> = ({
  items,
  depth,
  expandedIds,
  activeId,
  overItemId,
  onToggle,
  onAddChild,
  onEdit,
  onDelete,
}) => {
  const sortableIds = items.map(i => toSortableId(i.id));

  return (
    <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
      {items.map(item => {
        const isExpanded = expandedIds.has(item.id);
        return (
          <React.Fragment key={item.id}>
            <TreeItem
              item={item}
              depth={depth}
              isExpanded={isExpanded}
              activeId={activeId}
              overItemId={overItemId}
              onToggle={onToggle}
              onAddChild={onAddChild}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {isExpanded && item.children.length > 0 && (
              <RenderTree
                items={item.children}
                depth={depth + 1}
                expandedIds={expandedIds}
                activeId={activeId}
                overItemId={overItemId}
                onToggle={onToggle}
                onAddChild={onAddChild}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </React.Fragment>
        );
      })}
    </SortableContext>
  );
};

export default RenderTree;
