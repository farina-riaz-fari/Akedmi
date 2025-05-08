import { openDB } from "idb";

const DB_NAME = "UserDB";
const STORE_NAME = "users";

export const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "userId" });
      }
    },
  });
};

export const saveUserToDB = async (user) => {
  const db = await getDB();
  await db.put(STORE_NAME, user);
};

export const updateUserInDB = async (user) => {
  await saveUserToDB(user);
};

export const getAllUsersFromDB = async () => {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
};

export const deleteUserFromDB = async (userId) => {
  const db = await getDB();
  await db.delete(STORE_NAME, userId);
};
