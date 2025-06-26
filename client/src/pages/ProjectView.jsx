import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "Pending" });
  const [loading, setLoading] = useState(true);

  // Fetch project & tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(`/projects/${id}`);
        const taskRes = await axios.get(`/tasks/`);
        setProject(projectRes.data);
        setTasks(
          taskRes.data.filter((task) => task.project_id === parseInt(id))
        );
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // Create a new task
  const handleAddTask = async () => {
    try {
      await axios.post("/tasks/", {
        ...newTask,
        project_id: id,
      });
      setNewTask({ title: "", status: "Pending" });
      window.location.reload(); // or re-fetch data
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Delete project
  const handleDeleteProject = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/projects/${id}`);
        navigate("/projects");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6 text-white">
      {loading ? (
        <p>Loading project...</p>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-400">{project.description}</p>
            <button
              onClick={handleDeleteProject}
              className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Delete Project
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-3">Tasks</h2>
          <ul className="space-y-3">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.id} className="bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <span>
                      {task.title} — <em>{task.status}</em>
                    </span>
                    <button
                      onClick={async () => {
                        await axios.delete(`/tasks/${task.id}`);
                        window.location.reload(); // Quick and dirty for now
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No tasks for this project.</p>
            )}
          </ul>

          <div className="mt-6">
            <h3 className="text-xl mb-2">Add New Task</h3>
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="p-2 rounded bg-gray-700 text-white mr-2"
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="p-2 rounded bg-gray-700 text-white mr-2"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button
              onClick={handleAddTask}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Add Task
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectView;
