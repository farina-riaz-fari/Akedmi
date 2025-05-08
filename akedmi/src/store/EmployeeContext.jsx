import { createContext, useState, useEffect } from "react";
import {
  saveEmployeeToDB,
  deleteEmployeeFromDB,
} from "../utils/employeeIndexedDB";
import { openDB } from "idb";

export const EmployeeContext = createContext({
  employees: [],
  addEmployee: () => {},
  updateEmployee: () => {},
  deleteEmployee: () => {},
});

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    const db = await openDB("EmployeeDB", 1, {
      upgrade(db) {
        db.createObjectStore("employees", { keyPath: "employee_code" });
      },
    });
    const employeesList = await db.getAll("employees");
    setEmployees(employeesList);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const addEmployee = async (employee) => {
    const db = await openDB("EmployeeDB", 1);
    const tx = db.transaction("employees", "readwrite");
    await tx.objectStore("employees").add(employee);
    await tx.done;
    setEmployees((prev) => [...prev, employee]);
  };

  const updateEmployee = async (updatedEmployee) => {
    await saveEmployeeToDB(updatedEmployee);
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employee_code === updatedEmployee.employee_code
          ? updatedEmployee
          : emp
      )
    );
  };

  const deleteEmployee = async (employee_code) => {
    await deleteEmployeeFromDB(employee_code);
    setEmployees((prev) =>
      prev.filter((emp) => emp.employee_code !== employee_code)
    );
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider };
