import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact"
import ResetPass from "./pages/ResetPass"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ResetPass />} />
      </Routes>
    </Router>
  );
}

export default App;
