import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  deleteUserFromDB,
  getAllUsersFromDB,
  saveUserToDB,
} from "../utils/usersIndexedDB";

const UserContext = createContext({
  users: [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const storedUsers = await getAllUsersFromDB();
      setUsers(storedUsers);
    };
    loadUsers();
  }, []);

  const addUser = async (user) => {
    const newUser = {
      ...user,
      userId: user.userId || uuidv4(),
    };
    setUsers((prev) => [...prev, newUser]);
    await saveUserToDB(newUser);
  };

  const updateUser = async (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
    await saveUserToDB(updatedUser);
  };

  const deleteUser = async (userId) => {
    await deleteUserFromDB(userId);
    setUsers((prev) => prev.filter((user) => user.userId !== userId));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
