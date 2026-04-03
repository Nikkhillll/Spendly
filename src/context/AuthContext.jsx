import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("et_session")) || null;
    } catch {
      return null;
    }
  });

  const loginUser = useCallback((userData, token) => {
    localStorage.setItem("et_session", JSON.stringify(userData));
    localStorage.setItem("et_token", token);
    setUser(userData);
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("et_session");
    localStorage.removeItem("et_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this in any component instead of useContext(AuthContext)
export function useAuth() {
  return useContext(AuthContext);
}
