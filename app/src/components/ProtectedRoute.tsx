import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("access_token")
  );

  const signin = (token) => {
    setAuthToken(token);
    localStorage.setItem("access_token", token);
  };

  const signout = () => {
    setAuthToken(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ authToken, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
