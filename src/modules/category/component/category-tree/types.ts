import type { ICategory } from "@/schema/category";

export type DropPosition = "before" | "inside" | "after";

export interface CategoryTreeProps {
  isFetching?: boolean;
  categoriesData?: ICategory[];
  activeCategoryId?: number | null;
  onAddChild?: (item: ICategory) => void;
  onEdit?: (item: ICategory) => void;
  onDelete?: (item: ICategory) => void;
}

export interface TreeItemProps {
  item: ICategory;
  depth: number;
  isExpanded: boolean;
  isActive: boolean;
  dropPosition: DropPosition | null;
  isDropDisabled: boolean;
  isDragSource: boolean;
  onToggle: (id: number) => void;
  onAddChild?: (item: ICategory) => void;
  onEdit?: (item: ICategory) => void;
  onDelete?: (item: ICategory) => void;
}

export interface ITreeHistoryEntry {
  itemId: number;
  oldParentId: number | null;
  newParentId: number | null;
  oldIndex: number;
  newIndex: number;
}
