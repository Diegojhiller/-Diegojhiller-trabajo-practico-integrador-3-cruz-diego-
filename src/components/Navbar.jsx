import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // TODO: Variable temporal para pruebas
  const isAuth = false;

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/login");
  };

  return (
    // CAMBIO: Fondo oscuro (neutral-900) y borde naranja abajo
    <nav className="bg-neutral-900 border-b border-orange-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO: Texto naranja fuerte */}
        <Link
          to="/"
          className="text-orange-500 text-2xl font-bold tracking-wider hover:text-orange-400 transition"
        >
          TaskApp
        </Link>

        {/* ENLACES */}
        <div className="space-x-4">
          {isAuth ? (
            <>
              {/* Enlaces normales: blancos que se vuelven naranjas al pasar el mouse */}
              <Link
                to="/home"
                className="text-gray-300 hover:text-orange-400 transition"
              >
                Inicio
              </Link>
              <Link
                to="/tasks"
                className="text-gray-300 hover:text-orange-400 transition"
              >
                Tareas
              </Link>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-orange-400 transition"
              >
                Perfil
              </Link>

              {/* Botón Salir: Naranja con texto blanco */}
              <button
                onClick={handleLogout}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded font-bold transition"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-orange-400 transition font-medium"
              >
                Ingresar
              </Link>

              {/* Botón Registro: Naranja vibrante */}
              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded font-bold hover:bg-orange-600 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
