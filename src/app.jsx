
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/signup.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import Home from "./pages/Home.jsx";
import Utilisateurs from "./pages/Utilisateurs.jsx";
import Courses from "./pages/Courses.jsx";



export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


         

        {/* Role Pages */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/utilisateurs" element={<Utilisateurs />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}