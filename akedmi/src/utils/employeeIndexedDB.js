import { openDB } from "idb";

const DB_NAME = "EmployeeDB";
const STORE_NAME = "employees";

export const getEmployeeDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "employee_code" });
      }
    },
  });
};

export const saveEmployeeToDB = async (employee) => {
  const db = await getEmployeeDB();
  await db.put(STORE_NAME, employee);
};

export const getAllEmployeesFromDB = async () => {
  const db = await getEmployeeDB();
  return await db.getAll(STORE_NAME);
};

export const deleteEmployeeFromDB = async (employee_code) => {
  const db = await getEmployeeDB();
  if (!employee_code) {
    console.error("Invalid employee_code provided for deletion");
    return;
  }
  await db.delete(STORE_NAME, employee_code);
};
