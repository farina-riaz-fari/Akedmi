import { openDB } from "idb";

const DB_NAME = "PartnerDB";
const STORE_NAME = "partners";

export const getPartnerDB = async () => {
  try {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "userId" });
        }
      },
    });
  } catch (error) {
    console.error("Error opening database", error);
    throw new Error("Failed to open PartnerDB");
  }
};

export const savePartnerToDB = async (partner) => {
  try {
    const db = await getPartnerDB();
    await db.put(STORE_NAME, partner);
  } catch (error) {
    console.error("Error saving partner to database", error);
    throw new Error("Failed to save partner to database");
  }
};

export const getAllPartnersFromDB = async () => {
  try {
    const db = await getPartnerDB();
    return await db.getAll(STORE_NAME);
  } catch (error) {
    console.error("Error retrieving partners from database", error);
    throw new Error("Failed to get partners from database");
  }
};

export const deletePartnerFromDB = async (userId) => {
  try {
    const db = await getPartnerDB();
    await db.delete(STORE_NAME, userId);
  } catch (error) {
    console.error("Error deleting partner from database", error);
    throw new Error("Failed to delete partner from database");
  }
};
