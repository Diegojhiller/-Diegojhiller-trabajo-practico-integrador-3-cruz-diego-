import { useEffect, useState } from "react";
import  Loading  from "../components/Loading.jsx";
import { useNavigate } from "react-router";

 const Profile = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error loading profile");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error("Error logging in", error);
    } finally {
      onLogout();
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <main className="min-h-screen flex items-start justify-center bg-gray-50 p-4 pt-10">
      <section className="w-full max-w-2xl bg-white p-6 md:p-8 shadow-lg rounded-xl">
        {loading && <Loading />}

        {/* CABECERA DEL PERFIL */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {/* Si userData existe, muestra la primera letra del nombre */}
            {userData?.name ? userData.name[0] : "U"}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {userData?.name
                ? `${userData.name} ${userData.lastname}`
                : "Profile"}
            </h2>
            <p className="text-gray-500 text-sm">Personal information</p>
          </div>
        </div>

        {/* LÍNEA DIVISORA */}
        <hr className="border-t border-gray-200 mb-6" />

        {/* CONTENIDO DEL PERFIL (DATOS) */}
        {!loading && userData && (
          <div className="space-y-4">
            {/* Dato: Name */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Name</span>
              <p className="text-gray-800 font-semibold">{userData.name}</p>
            </div>

            {/* Dato: Lastname */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Lastname</span>
              <p className="text-gray-800 font-semibold">{userData.lastname}</p>
            </div>

            {/* Dato: Username (Asumiendo que existe en userData) */}
            {userData.username && (
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Username</span>
                <p className="text-gray-800 font-semibold">
                  {userData.username}
                </p>
              </div>
            )}

            {/* Dato: Email (Asumiendo que existe en userData) */}
            {userData.email && (
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Email</span>
                <p className="text-gray-800 font-semibold">{userData.email}</p>
              </div>
            )}

            {/* BOTÓN LOGOUT */}
            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;