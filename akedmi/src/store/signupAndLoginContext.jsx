import { createContext, useState, useEffect } from "react";
import {
  deleteAuthFromDB,
  getAuthFromDB,
  saveAuthToDB,
} from "../utils/signupAndLoginIndexedDB";

export const AuthContext = createContext({
  auth: [],
  isAuthenticated: false,
  addAuth: async () => "",
  loginAuth: async () => false,
  logoutAuth: () => {},
  deleteAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("auth-user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const addAuth = async (authData) => {
    const existing = await getAuthFromDB(authData.email);
    if (existing) return "User already exists";
    if (authData.password !== authData.confirmPassword)
      return "Passwords do not match";

    await saveAuthToDB(authData);
    setAuth((prev) => [...prev, authData]);
    return "User registered successfully";
  };

  const loginAuth = async (email, password) => {
    const user = await getAuthFromDB(email);
    if (user && user.password === password) {
      localStorage.setItem("auth-user", JSON.stringify(user));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAuth = () => {
    localStorage.removeItem("auth-user");
    setIsAuthenticated(false);
  };

  const deleteAuth = async (email) => {
    await deleteAuthFromDB(email);
    setAuth((prev) => prev.filter((u) => u.email !== email));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAuthenticated,
        addAuth,
        loginAuth,
        logoutAuth,
        deleteAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
