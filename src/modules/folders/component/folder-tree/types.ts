import type { IFolder } from "@/schema/folder";

export type DropPosition = "before" | "inside" | "after";

export interface FolderTreeProps {
  isFetching?: boolean;
  foldersData?: IFolder[];
  activeFolderId?: number | null;
  onAddChild?: (item: IFolder) => void;
  onEdit?: (item: IFolder) => void;
  onDelete?: (item: IFolder) => void;
}

export interface TreeItemProps {
  item: IFolder;
  depth: number;
  isExpanded: boolean;
  isActive: boolean;
  dropPosition: DropPosition | null;
  isDropDisabled: boolean;
  isDragSource: boolean;
  onToggle: (id: number) => void;
  onAddChild?: (item: IFolder) => void;
  onEdit?: (item: IFolder) => void;
  onDelete?: (item: IFolder) => void;
}

export interface ITreeHistoryEntry {
  itemId: number;
  oldParentId: number | null;
  newParentId: number | null;
  oldIndex: number;
  newIndex: number;
}
