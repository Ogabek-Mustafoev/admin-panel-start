import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "media_manage_db";
const STORE_NAME = "app_assets";
const BG_KEY = "background_image";

export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveBackground = async (file: File): Promise<string> => {
  const db = await initDB();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      const data = reader.result as string;
      await db.put(STORE_NAME, data, BG_KEY);
      resolve(data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getBackground = async (): Promise<string | null> => {
  const db = await initDB();
  return db.get(STORE_NAME, BG_KEY);
};

export const removeBackgroundFromDB = async (): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_NAME, BG_KEY);
};
