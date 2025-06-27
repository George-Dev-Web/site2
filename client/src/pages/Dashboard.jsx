import React from "react";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import ActivityCard from "../components/ActivityCard";
import TaskSection from "../components/TaskSection";

import "../styles/pages/Dashboard.css";

// Icons (You can swap these or use react-icons/lucide-react)
import {
  FaProjectDiagram,
  FaClipboardList,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
  // Example data (you’ll replace with real API data)
  const stats = [
    {
      label: "Active Projects",
      value: 3,
      icon: <FaProjectDiagram />,
      color: "bg-blue",
    },
    {
      label: "Total Tasks",
      value: 42,
      icon: <FaClipboardList />,
      color: "bg-orange",
    },
    {
      label: "Completed",
      value: 18,
      icon: <FaCheckCircle />,
      color: "bg-green",
    },
    { label: "Workers", value: 12, icon: <FaUsers />, color: "bg-purple" },
  ];

  const projects = [
    {
      id: 1,
      name: "Site A",
      description: "Foundation phase",
      dueDate: "2025-07-15",
      status: "In Progress",
      totalTasks: 10,
      completedTasks: 4,
    },
    {
      id: 2,
      name: "Bridge Build",
      description: "Piling complete",
      dueDate: "2025-08-01",
      status: "Planning",
      totalTasks: 12,
      completedTasks: 1,
    },
  ];

  const tasks = [
    { id: 1, title: "Dig trenches", status: "Completed" },
    { id: 2, title: "Pour concrete", status: "In Progress" },
    { id: 3, title: "Install steel bars", status: "Pending" },
  ];

  const recentActivity = [
    {
      taskName: "Pour concrete",
      projectName: "Site A",
      assignee: "George",
      status: "In Progress",
    },
    {
      taskName: "Lay blocks",
      projectName: "Bridge Build",
      assignee: "Tracy",
      status: "Completed",
    },
    {
      taskName: "Survey land",
      projectName: "Site A",
      assignee: "Sam",
      status: "Pending",
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">SiteTask Tracker</h1>

      <div className="stat-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-main">
        {/* Left: Projects & Tasks */}
        <div className="dashboard-left">
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          <TaskSection title="Tasks - Site A" tasks={tasks} />
        </div>

        {/* Right: Activity Feed */}
        <div className="dashboard-right">
          <h3 className="activity-title">Recent Activity</h3>
          {recentActivity.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
