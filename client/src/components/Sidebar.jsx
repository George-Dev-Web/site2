import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-gray-700 ${
      isActive ? "bg-gray-700 text-white font-semibold" : "text-gray-300"
    }`;

  return (
    <aside className="w-60 bg-gray-900 border-r border-gray-800 p-4 space-y-2 h-screen">
      <h2 className="text-white text-lg font-semibold mb-4">Navigation</h2>
      <NavLink to="/projects" className={linkClass}>
        Projects
      </NavLink>
      <NavLink to="/tasks" className={linkClass}>
        All Tasks
      </NavLink>
      <NavLink to="/mytasks" className={linkClass}>
        My Tasks
      </NavLink>
      <NavLink to="/assignees" className={linkClass}>
        Assignees
      </NavLink>
    </aside>
  );
};

export default Sidebar;
