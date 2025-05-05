import React, { createContext, useState, useEffect } from "react";
import axios from "../config/config-axios";
// Tạo UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
  });
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user.id && user) {
        try {
          const response = await axios.get(
            `http://localhost:8080/cart/get/number/${user.id}`
          );
          setNumber(response.data.data);
        } catch (error) {
          console.error("Error fetching cart number:", error);
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, number }}>
      {children}
    </UserContext.Provider>
  );
};
