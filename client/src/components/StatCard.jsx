import React from "react";
import "../styles/components/StatCard.css";

const StatCard = ({ icon, label, value, color }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div className="stat-info">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
