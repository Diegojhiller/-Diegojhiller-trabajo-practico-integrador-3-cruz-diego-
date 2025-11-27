import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Loading from "../../components/Loading";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. IMPORTANTE: Usamos 'name' en vez de 'firstname' porque así lo pide tu backend
  const { formState, onInputChange, onResetForm } = useForm({
    username: "",
    email: "",
    password: "",
    name: "", // Antes firstname
    lastname: "",
    // dni: '',    // Comentado: Tu backend actual no recibe DNI en el registro
  });

  const { username, email, password, name, lastname } = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (username.length < 3 || password.length < 6) {
      setError("Usuario (min 3) o contraseña (min 6) muy cortos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 2. Petición al Backend
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviamos exactamente lo que pide el controlador auth.controller.js
        body: JSON.stringify({
          name,
          lastname,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      // 3. Si la respuesta no es OK (ej: error 500 o 400), lanzamos error
      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      // 4. Éxito: Redireccionamos al login para que entre
      console.log("Registro exitoso:", data);
      alert("Usuario registrado con éxito. Ahora inicia sesión."); // Feedback simple
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-900 py-10 px-4">
      {loading && <Loading />}

      <div className="bg-neutral-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Crear Cuenta
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onInputChange}
                className="w-full bg-neutral-900 text-white border border-gray-700 rounded p-2 focus:border-orange-500 focus:outline-none"
                placeholder="Juan"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={onInputChange}
                className="w-full bg-neutral-900 text-white border border-gray-700 rounded p-2 focus:border-orange-500 focus:outline-none"
                placeholder="Pérez"
                required
              />
            </div>
          </div>

          {/* DNI ELIMINADO VISUALMENTE PORQUE EL BACKEND NO LO GUARDA */}

          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onInputChange}
              className="w-full bg-neutral-900 text-white border border-gray-700 rounded p-2 focus:border-orange-500 focus:outline-none"
              placeholder="juanperez"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              className="w-full bg-neutral-900 text-white border border-gray-700 rounded p-2 focus:border-orange-500 focus:outline-none"
              placeholder="juan@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              className="w-full bg-neutral-900 text-white border border-gray-700 rounded p-2 focus:border-orange-500 focus:outline-none"
              placeholder="******"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-200 mt-6 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:underline font-bold"
          >
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
