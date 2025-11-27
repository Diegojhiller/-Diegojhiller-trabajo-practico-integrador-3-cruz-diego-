import { useEffect, useState } from "react";
import { Link } from "react-router"; // O react-router-dom
import Loading from "/src/components/Loading.jsx";

const Home = ({ taskRefreshKey }) => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const promiseProfile = fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const promiseTasks = fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      const [profileResponse, tasksResponse] = await Promise.all([
        promiseProfile,
        promiseTasks,
      ]);

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUserData(profileData);
      }
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : [])
        );
      }
    } catch (error) {
      console.error("Error loading Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, [taskRefreshKey]);

  const allTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = allTasks - completedTasks;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  return (
    // CONTENEDOR PRINCIPAL
    <main className="min-h-screen bg-black p-4 md:p-8">
      {/* DASHBOARD CARD */}
      <div className="w-full max-w-5xl mx-auto bg-zinc-900/50 p-6 md:p-10 border border-zinc-800 rounded-2xl relative">
        {/* TÍTULO DE BIENVENIDA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-light text-zinc-300">
            Bienvenido,{" "}
            <span className="font-serif text-yellow-500 font-bold text-4xl block md:inline">
              {userData?.user?.name || "User"}
            </span>
          </h1>
          <span className="text-xs uppercase tracking-widest text-zinc-500 mt-2 md:mt-0 border border-zinc-700 px-3 py-1 rounded-full">
            Premium Dashboard
          </span>
        </div>

        {/* CONTENEDOR DE ESTADÍSTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Tarjeta: Total de Tareas */}
          <div className="bg-black p-6 rounded-xl border border-zinc-800 hover:border-yellow-600/50 transition-all duration-300 group">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Total Tasks
            </p>
            <h2 className="text-5xl font-bold text-white group-hover:text-yellow-500 transition-colors">
              {allTasks}
            </h2>
          </div>

          {/* Tarjeta: Completadas (Detalle Verde sutil) */}
          <div className="bg-black p-6 rounded-xl border border-zinc-800 hover:border-green-900/50 transition-all duration-300">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Completad
            </p>
            <h2 className="text-5xl font-bold text-emerald-500/80">
              {completedTasks}
            </h2>
          </div>

          {/* Tarjeta: Pendientes (Detalle Dorado) */}
          <div className="bg-black p-6 rounded-xl border border-zinc-800 hover:border-yellow-600/50 transition-all duration-300">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Pending
            </p>
            <h2 className="text-5xl font-bold text-yellow-600">
              {pendingTasks}
            </h2>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="flex items-center justify-center">
          <Link
            to="/tasks"
            className="w-full md:w-auto btn-gold text-center py-3 px-12 rounded-full shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1 transition-all duration-300"
          >
            Manage Tasks
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
