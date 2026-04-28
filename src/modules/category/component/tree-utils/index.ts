import type { ICategory } from "@/schema/category";

let nextId = 100;

export function generateId(): number {
  return nextId++;
}

// ─── Sortable ID helpers ───────────────────────────────────────────────────
export type UniqueIdentifier = string | number;
export const toSortableId = (id: number): UniqueIdentifier => `cat-${id}`;
export const fromSortableId = (sid: UniqueIdentifier): number =>
  parseInt(String(sid).replace("cat-", ""), 10);


/** Deep clone */
export function cloneTree(items: ICategory[]): ICategory[] {
  return JSON.parse(JSON.stringify(items));
}

/** Find node by id anywhere in tree */
export function findNode(
  items: ICategory[],
  id: number
): ICategory | null {
  for (const item of items) {
    if (item.id === id) return item;
    const found = findNode(item.children, id);
    if (found) return found;
  }
  return null;
}

/** Find parent of node */
export function findParent(
  items: ICategory[],
  id: number,
  parent: ICategory | null = null
): ICategory | null {
  for (const item of items) {
    if (item.id === id) return parent;
    const found = findParent(item.children, id, item);
    if (found !== undefined) return found;
  }
  return undefined as any;
}

/** Remove node from tree, return removed node */
export function removeNode(
  items: ICategory[],
  id: number
): { tree: ICategory[]; removed: ICategory | null } {
  let removed: ICategory | null = null;

  function recurse(list: ICategory[]): ICategory[] {
    const result: ICategory[] = [];
    for (const item of list) {
      if (item.id === id) {
        removed = item;
      } else {
        result.push({ ...item, children: recurse(item.children) });
      }
    }
    return result;
  }

  return { tree: recurse(items), removed };
}

/** Insert node as child of targetId at index */
export function insertAsChild(
  items: ICategory[],
  targetId: number,
  node: ICategory,
  index: number = -1
): ICategory[] {
  return items.map((item) => {
    if (item.id === targetId) {
      const children = [...item.children];
      if (index === -1 || index >= children.length) {
        children.push({ ...node, parent_id: targetId });
      } else {
        children.splice(index, 0, { ...node, parent_id: targetId });
      }
      return { ...item, children };
    }
    return { ...item, children: insertAsChild(item.children, targetId, node, index) };
  });
}

/** Insert node at root level at index */
export function insertAtRoot(
  items: ICategory[],
  node: ICategory,
  index: number
): ICategory[] {
  const result = [...items];
  const clamped = Math.max(0, Math.min(index, result.length));
  result.splice(clamped, 0, { ...node, parent_id: null });
  return result;
}

/** Reorder children inside a parent */
export function reorderChildren(
  items: ICategory[],
  parentId: number | null,
  fromIndex: number,
  toIndex: number
): ICategory[] {
  if (parentId === null) {
    const result = [...items];
    const [moved] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, moved);
    return result;
  }
  return items.map((item) => {
    if (item.id === parentId) {
      const children = [...item.children];
      const [moved] = children.splice(fromIndex, 1);
      children.splice(toIndex, 0, moved);
      return { ...item, children };
    }
    return { ...item, children: reorderChildren(item.children, parentId, fromIndex, toIndex) };
  });
}

/** Update a node's name */
export function updateNode(
  items: ICategory[],
  id: number,
  data: Partial<ICategory>
): ICategory[] {
  return items.map((item) => {
    if (item.id === id) return { ...item, ...data };
    return { ...item, children: updateNode(item.children, id, data) };
  });
}

/** Delete node */
export function deleteNode(items: ICategory[], id: number): ICategory[] {
  return removeNode(items, id).tree;
}

/** Flatten tree to list of {item, depth, parentId, index} */
export interface FlatItem {
  item: ICategory;
  depth: number;
  parentId: number | null;
  index: number;
}

export function flattenTree(
  items: ICategory[],
  depth = 0,
  parentId: number | null = null
): FlatItem[] {
  const result: FlatItem[] = [];
  items.forEach((item, index) => {
    result.push({ item, depth, parentId, index });
    if (item.children.length > 0) {
      result.push(...flattenTree(item.children, depth + 1, item.id));
    }
  });
  return result;
}

export function createNewCategory(
  nameUz: string,
  parentId: number | null = null
): ICategory {
  return {
    id: generateId(),
    name: { uz: nameUz, en: nameUz, ru: nameUz },
    image_url: "",
    mobile_image_url: "",
    parent_id: parentId,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    children: [],
  };
}
