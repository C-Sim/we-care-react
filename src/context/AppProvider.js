import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") || false
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || undefined
  );

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};
