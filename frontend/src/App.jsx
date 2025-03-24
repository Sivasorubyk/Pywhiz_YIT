import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact"
import ResetPass from "./pages/ResetPass"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ResetPass />} />
          
          {/* Protected routes - require login */}
          <Route
            path="/learn"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
