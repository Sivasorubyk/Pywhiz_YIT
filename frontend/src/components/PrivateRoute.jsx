import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default PrivateRoute;