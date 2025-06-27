// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "➤" : "⬅"}
      </button>
      <nav className="sidebar-nav">
        <Link to="/dashboard">🏠 {collapsed ? "" : "Dashboard"}</Link>
        <Link to="/projects">📁 {collapsed ? "" : "Projects"}</Link>
        <Link to="/tasks">📝 {collapsed ? "" : "Tasks"}</Link>
        <Link to="/mytasks">✅ {collapsed ? "" : "My Tasks"}</Link>
        <Link to="/assignees">👷🏾‍♂️ {collapsed ? "" : "Assignees"}</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
