import type { IFolder } from "@/schema/folder";

/**
 * Deep clone a folder tree.
 */
export const cloneTree = (items: IFolder[]): IFolder[] =>
  items.map((item) => ({
    ...item,
    children: item.children ? cloneTree(item.children) : [],
  }));

/**
 * Find a folder node by ID anywhere in the tree.
 */
export const findItemById = (
  items: IFolder[],
  id: number,
): IFolder | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children?.length) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Find the parent array and index of an item.
 */
export const findItemContext = (
  items: IFolder[],
  id: number,
): { parent: IFolder[]; index: number } | null => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) return { parent: items, index: i };
    if (items[i].children?.length) {
      const found = findItemContext(items[i].children!, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Remove an item from the tree and return it.
 */
export const removeItem = (
  items: IFolder[],
  id: number,
): IFolder | null => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) return items.splice(i, 1)[0];
    if (items[i].children?.length) {
      const found = removeItem(items[i].children!, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Find the parent ID of an item (null if root-level).
 */
export const findParentId = (
  items: IFolder[],
  targetId: number,
  parentId: number | null = null,
): number | null | undefined => {
  for (const item of items) {
    if (item.id === targetId) return parentId;
    if (item.children?.length) {
      const found = findParentId(item.children, targetId, item.id);
      if (found !== undefined) return found;
    }
  }
  return undefined;
};

/**
 * Collect all descendant IDs of an item (used to prevent circular drops).
 */
export const collectDescendantIds = (item: IFolder): Set<number> => {
  const ids = new Set<number>();
  const walk = (children: IFolder[]) => {
    for (const child of children) {
      ids.add(child.id);
      if (child.children?.length) walk(child.children);
    }
  };
  if (item.children?.length) walk(item.children);
  return ids;
};
