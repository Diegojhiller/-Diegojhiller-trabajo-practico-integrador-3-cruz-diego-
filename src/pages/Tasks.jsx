import { useEffect, useState } from "react";
import  Loading  from "../components/Loading";
import { useForm } from "../hooks/useForm.js";

 const Tasks = ({ onTasksChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { formState, setForm, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  // Crear o editar
  const [idEdit, setIdEdit] = useState(null);

  const fetchTasks = async () => {
    // if (tasks.length === 0) {
    setLoading(true);
    // }

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        console.error("Error loading tasks");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (idEdit) {
      await handleUpdateTask();
    } else {
      await handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdEdit(task.id);
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCanceleEdit = () => {
    setIdEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    if (!formState.title) {
      alert("the title is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        alert("The task created");
        handleReset();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error creating task");
      }
    } catch (error) {
      console.error(error);
      alert("Error in the server");
    }
  };

  const handleUpdateTask = async () => {
    if (!formState.title) {
      alert("The title is required");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        alert("The task updated");
        handleCanceleEdit();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error updating task");
      }
    } catch (error) {
      console.error(error);
      alert("Error in the server");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        alert("The task deleted");
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting the task");
      }
    } catch (error) {
      console.error(error);
      alert("Error in the server");
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* GRID DE DOS COLUMNAS (en desktop) / UNA COLUMNA (en mobile) */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SECCIÓN FORMULARIO (1/3 en desktop) */}
        <section className="lg:col-span-1 bg-white p-6 shadow-xl rounded-lg h-fit sticky top-20">
          <h2
            className={`text-2xl font-bold mb-6 ${
              idEdit ? "text-orange-500" : "text-blue-600"
            }`}
          >
            {idEdit ? "Edit" : "Create"}{" "}
            <span className="font-light">Task</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Title */}
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Example: Buy Bread"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                required
              />
            </div>

            {/* Input Description */}
            <div className="space-y-1">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Details"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
              ></textarea>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="is_completed"
                name="is_completed"
                checked={formState.is_completed}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="is_completed"
                className="text-sm font-medium text-gray-700"
              >
                Mark as completed
              </label>
            </div>

            <div className="flex flex-col space-y-2 pt-4">
              {/* Botón Principal (Guardar/Actualizar) */}
              <button
                type="submit"
                className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ${
                  idEdit
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {idEdit ? "update task" : "save task"}
              </button>

              {/* Botón Cancelar (solo en modo edición) */}
              {idEdit && (
                <button
                  type="button"
                  onClick={handleCanceleEdit}
                  className="w-full bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150"
                >
                  cancel updated
                </button>
              )}
            </div>
          </form>
        </section>

        {/* SECCIÓN LISTA DE TAREAS (2/3 en desktop) */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
            My Tasks
          </h2>

          <div className="space-y-4">
            {loading && <Loading />}

            {!loading && (
              <>
                {tasks.length === 0 ? (
                  <p className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                    There are no tasks. Use the form on the left to create your
                    first one!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      // TARJETA DE TAREA INDIVIDUAL
                      <div
                        key={task.id}
                        className={`bg-white p-4 shadow rounded-lg flex justify-between items-center transition duration-200 ${
                          task.is_completed
                            ? "border-l-4 border-green-500 opacity-70"
                            : "border-l-4 border-blue-500 hover:shadow-md"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-lg font-semibold ${
                              task.is_completed
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {task.description}
                          </p>
                          {/* Etiqueta de estado (opcional, para mayor claridad) */}
                          <span
                            className={`text-xs mt-1 inline-block font-medium px-2 py-0.5 rounded ${
                              task.is_completed
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {task.is_completed ? "COMPLETED" : "PENDING"}
                          </span>
                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleSelectEdit(task)}
                            className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition duration-150"
                            title="Edit"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition duration-150"
                            title="Delete"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Tasks;