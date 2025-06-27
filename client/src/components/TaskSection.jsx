import React from "react";
import "../styles/components/TaskSection.css";

const TaskSection = ({ title, tasks, onTaskClick }) => {
  return (
    <div className="task-section">
      <div className="task-section-header">
        <h3 className="task-section-title">{title}</h3>
        <button className="add-task-btn">+ Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="task-item"
              onClick={() => onTaskClick && onTaskClick(task.id)}
            >
              <span className="task-name">{task.title}</span>
              <span className={`task-badge ${getStatusClass(task.status)}`}>
                {task.status}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "badge-green";
    case "in progress":
      return "badge-blue";
    case "pending":
      return "badge-yellow";
    default:
      return "badge-gray";
  }
};

export default TaskSection;
