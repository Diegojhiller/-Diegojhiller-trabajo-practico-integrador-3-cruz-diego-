import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Importamos las páginas que acabamos de crear
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    // 1. BrowserRouter es el "padre" que habilita la navegación
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* 2. Navbar va DENTRO del Router para que funcionen sus enlaces */}
        <Navbar />

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* RUTAS PÚBLICAS (Por ahora accesibles siempre) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* RUTAS PRIVADAS (Por ahora accesibles siempre, luego las protegeremos) */}
            <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />

            {/* RUTAS POR DEFECTO: Si la ruta no existe, manda a login */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        {/* 3. Footer al final */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
