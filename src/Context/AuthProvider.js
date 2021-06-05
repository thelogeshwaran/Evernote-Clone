import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Components/Firebase/Firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProvider() {
  return useContext(AuthContext);
}
