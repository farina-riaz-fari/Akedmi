import { openDB } from "idb";

const DB_NAME = "AuthDB";
const STORE_NAME = "auth";

export const getAuthDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
      }
    },
  });
};

export const saveAuthToDB = async (auth) => {
  const db = await getAuthDB();
  await db.put(STORE_NAME, auth);
};

export const getAllAuthFromDB = async () => {
  const db = await getAuthDB();
  return await db.getAll(STORE_NAME);
};

export const getAuthFromDB = async (email) => {
  const db = await getAuthDB();
  return await db.get(STORE_NAME, email);
};

export const deleteAuthFromDB = async (email) => {
  const db = await getAuthDB();
  await db.delete(STORE_NAME, email);
};
