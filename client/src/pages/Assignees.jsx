import React, { useEffect, useState } from "react";
import axios from "../services/api";

const Assignees = () => {
  const [assignees, setAssignees] = useState([]);
  const [newAssignee, setNewAssignee] = useState({ name: "", role: "" });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignees();
  }, []);

  const fetchAssignees = async () => {
    try {
      const res = await axios.get("/assignees/");
      setAssignees(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch assignees:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("/assignees/", newAssignee);
      setNewAssignee({ name: "", role: "" });
      fetchAssignees();
    } catch (err) {
      console.error("Failed to add assignee:", err);
    }
  };

  const handleEdit = (assignee) => {
    setEditingId(assignee.id);
    setFormData({ name: assignee.name, role: assignee.role });
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/assignees/${id}`, formData);
      setEditingId(null);
      fetchAssignees();
    } catch (err) {
      console.error("Failed to update assignee:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this assignee?")) {
      try {
        await axios.delete(`/assignees/${id}`);
        fetchAssignees();
      } catch (err) {
        console.error("Failed to delete assignee:", err);
      }
    }
  };

  const renderField = (assignee, key) => {
    return editingId === assignee.id ? (
      <input
        className="bg-gray-700 text-white px-2 py-1 rounded"
        value={formData[key] || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
      />
    ) : (
      <span>{assignee[key]}</span>
    );
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Assignees</h2>

      {/* Add new assignee */}
      <div className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={newAssignee.name}
          onChange={(e) =>
            setNewAssignee({ ...newAssignee, name: e.target.value })
          }
          className="p-2 bg-gray-700 text-white rounded"
        />
        <input
          type="text"
          placeholder="Role"
          value={newAssignee.role}
          onChange={(e) =>
            setNewAssignee({ ...newAssignee, role: e.target.value })
          }
          className="p-2 bg-gray-700 text-white rounded"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* List all assignees */}
      {loading ? (
        <p>Loading assignees...</p>
      ) : assignees.length === 0 ? (
        <p>No assignees found.</p>
      ) : (
        <ul className="space-y-3">
          {assignees.map((assignee) => (
            <li
              key={assignee.id}
              className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div className="space-y-1">
                <div>
                  <strong>Name:</strong> {renderField(assignee, "name")}
                </div>
                <div>
                  <strong>Role:</strong> {renderField(assignee, "role")}
                </div>
              </div>
              <div className="space-x-2">
                {editingId === assignee.id ? (
                  <button
                    onClick={() => handleSave(assignee.id)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(assignee)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(assignee.id)}
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

export default Assignees;
