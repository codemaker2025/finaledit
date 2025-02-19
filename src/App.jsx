import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Dashboard from "./components/Home/Dashboard.jsx";
import Navbar from "./components/navigation/Navbar";
import EmpList from "./components/Home/EmpList.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmpList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
       
      </Routes>
    </Router>
  );
}
