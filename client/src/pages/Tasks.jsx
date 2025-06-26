import React, { useEffect, useState } from "react";
import axios from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks/");
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      status: task.status,
      start_date: task.start_date,
      end_date: task.end_date,
      project_id: task.project_id,
      assignee_id: task.assignee_id,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/tasks/${id}`, formData);
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this task?")) {
      try {
        await axios.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  const renderField = (task, key) => {
    return editingId === task.id ? (
      <input
        className="bg-gray-700 text-white px-2 py-1 rounded"
        value={formData[key] || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
      />
    ) : (
      <span>{task[key]}</span>
    );
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2 border border-gray-700">Title</th>
                <th className="p-2 border border-gray-700">Status</th>
                <th className="p-2 border border-gray-700">Start</th>
                <th className="p-2 border border-gray-700">End</th>
                <th className="p-2 border border-gray-700">Project ID</th>
                <th className="p-2 border border-gray-700">Assignee ID</th>
                <th className="p-2 border border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="bg-gray-900 hover:bg-gray-800">
                  <td className="p-2 border border-gray-700">
                    {renderField(task, "title")}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {renderField(task, "status")}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {renderField(task, "start_date")}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {renderField(task, "end_date")}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {renderField(task, "project_id")}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {renderField(task, "assignee_id")}
                  </td>
                  <td className="p-2 border border-gray-700 space-x-2">
                    {editingId === task.id ? (
                      <button
                        onClick={() => handleSave(task.id)}
                        className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(task)}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tasks;
