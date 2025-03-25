import { createContext, useContext, useState, useEffect } from "react";
import { fetchUser } from "../services/api"; // Import the fetchUser function

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      const decodedUser = parseJwt(token); // Decode the JWT token to get user info (if stored in the token)
      setUser(decodedUser); // Set the user info in context
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set user from localStorage
      }
    }
  }, [token]);

  const login = async (userData, token) => {
    setUser(userData); // userData should include the user's name
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // Store the user data in localStorage

    // Fetch user data from the API
    const fetchedUser = await fetchUser();
    setUser(fetchedUser); // Update user state with fetched user data
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Decode the JWT token to get user info (if available)
const parseJwt = (token) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decoded = JSON.parse(window.atob(base64));
  return decoded;
};
