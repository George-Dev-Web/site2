import React, { useEffect, useState } from "react";
import axios from "../services/api";

// For now, simulate current user (assignee) ID manually
const CURRENT_USER_ID = 1; // Replace with dynamic value later when auth is added

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get("/tasks/");
      const userTasks = res.data.filter(
        (task) => task.assignee_id === CURRENT_USER_ID
      );
      setMyTasks(userTasks);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setLoading(false);
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.patch(`/tasks/${id}`, { status: "Completed" });
      fetchMyTasks();
    } catch (err) {
      console.error("Failed to mark task as complete:", err);
    }
  };

  const deleteTask = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`/tasks/${id}`);
        fetchMyTasks();
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      {loading ? (
        <p>Loading your tasks...</p>
      ) : myTasks.length === 0 ? (
        <p>You currently have no assigned tasks.</p>
      ) : (
        <ul className="space-y-3">
          {myTasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-400">Status: {task.status}</p>
              </div>
              <div className="space-x-2">
                {task.status !== "Completed" && (
                  <button
                    onClick={() => markComplete(task.id)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTasks;
