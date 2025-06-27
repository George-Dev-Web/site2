import React from "react";
import "../styles/components/ActivityCard.css"; // Adjust the path as necessary

const ActivityCard = ({ taskName, projectName, assignee, status }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "in progress":
        return "status-inprogress";
      case "pending":
        return "status-pending";
      default:
        return "status-default";
    }
  };

  return (
    <div className="activity-card">
      <div className="task-header">
        <h4 className="task-title">{taskName}</h4>
        <span className={`task-status ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>
      <p className="task-project">{projectName}</p>
      <p className="task-assignee">Assigned to: {assignee}</p>
    </div>
  );
};

export default ActivityCard;
