import { useState } from "react";
import { Link, useNavigate } from "react-router"; // Asegúrate que sea 'react-router-dom' si usas v6, o 'react-router' si usas v7
import Loading from "/src/components/Loading.jsx";
import { useForm } from "/src/hooks/useForm.js";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const { formState, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin();
      } else {
        alert(data.message || "Credenciales invalidas");
        handleReset();
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
      handleReset();
    } finally {
      setLoading(false);
      navigate("/home");
    }
  };

  return (
    // CONTENEDOR PRINCIPAL (Fondo Negro)
    <main className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Círculo de luz decorativo de fondo (opcional) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl -z-10"></div>

      {loading && <Loading />}

      <div className="w-full max-w-md">
        {/* TARJETA DEL FORMULARIO (Dark & Gold) */}
        <div className="bg-zinc-900/90 p-8 shadow-2xl rounded-2xl border border-yellow-700/30 backdrop-blur-sm relative">
          {/* Brillo sutil en el borde superior */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-serif font-bold text-white tracking-wide">
              Bienvenido
            </h1>
            <div className="h-1 w-16 bg-yellow-600 mx-auto mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-yellow-500/80 uppercase tracking-wider ml-1"
              >
                Usuario
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formState.username}
                onChange={handleChange}
                id="username"
                className="w-full px-4 py-3 bg-black border border-zinc-700 text-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-300 placeholder-zinc-600"
                required
              />
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-yellow-500/80 uppercase tracking-wider ml-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formState.password}
                onChange={handleChange}
                id="password"
                className="w-full px-4 py-3 bg-black border border-zinc-700 text-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-300 placeholder-zinc-600"
                required
              />
            </div>

            {/* Botón Submit/Enter (Clase btn-gold del CSS) */}
            <button
              type="submit"
              className="w-full btn-gold py-3 px-4 rounded-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <span className="text-lg tracking-wide uppercase">
                {loading ? "Accessing..." : "Ingresar"}
              </span>
            </button>

            {/* Enlaces adicionales */}
            <div className="text-center pt-2">
              <p className="text-sm text-zinc-500">
                ¿Olvidó sus datos?{" "}
                <span className="text-zinc-600 italic">Muy pronto</span>
              </p>
            </div>
          </form>

          {/* Link a Register */}
          <p className="text-center text-sm text-zinc-400 mt-8 pt-6 border-t border-zinc-800">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-yellow-500 hover:text-yellow-400 font-semibold transition duration-150 underline decoration-yellow-500/30"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Footer Créditos */}
        <div className="text-center mt-6 text-zinc-600 text-xs">
          © 2025 TaskApp Premium <br /> Desarrollado por: Diego Jota
        </div>
      </div>
    </main>
  );
};

export default Login;
