import React from "react";
import "../styles/components/ProjectCard.css";

const ProjectCard = ({
  name = "Unnamed Project",
  description = "No description",
  dueDate = "N/A",
  status = "Unknown",
  totalTasks = 0,
  completedTasks = 0,
}) => {
  const safeTotal = Number(totalTasks) || 0;
  const safeCompleted = Number(completedTasks) || 0;
  const remaining = safeTotal - safeCompleted;
  const progress =
    safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0;

  const getStatusColor = (s) => {
    if (!s || typeof s !== "string") return "status-gray";

    switch (s.toLowerCase()) {
      case "in progress":
        return "status-blue";
      case "planning":
        return "status-yellow";
      case "completed":
        return "status-green";
      default:
        return "status-gray";
    }
  };

  return (
    <div className="project-card">
      <div className="project-header">
        <div>
          <h3 className="project-name">{name}</h3>
          <p className="project-description">{description}</p>
        </div>
        <span className={`status-badge ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="project-details">
        <p className="project-tasks">
          🕒 Tasks: {safeCompleted}/{safeTotal}
        </p>
        <p className="project-due">📅 Due: {dueDate}</p>
      </div>

      <div className="project-progress-bar">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="project-remaining">{remaining} tasks remaining</p>
      </div>
    </div>
  );
};

export default ProjectCard;
