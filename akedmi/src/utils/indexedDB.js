import { openDB } from 'idb';

const DB_NAME = 'CompanyDB';
const STORE_NAME = 'companies';

export const getDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'email' });
            }
        },
    });
};

export const saveCompanyToDB = async (company) => {
    const db = await getDB();
    await db.put(STORE_NAME, company);
};

export const getAllCompaniesFromDB = async () => {
    const db = await getDB();
    return await db.getAll(STORE_NAME);
};

export const deleteCompanyFromDB = async (email) => {
    const db = await getDB();
    if (!email) {
        console.error("Invalid email provided for deletion");
        return;
    }
    await db.delete(STORE_NAME, email);
};
