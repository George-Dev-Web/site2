import React, { useEffect, useState } from "react";
import axios from "../services/api";
import ProjectCard from "../components/ProjectCard";
import "../styles/pages/Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/projects/")
      .then((res) => {
        console.log("Fetched projects:", res.data); // ✅ Inspect the shape
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="projects-page">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="project-cards-container">
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map((project) => {
              console.log("Rendering project:", project); // ✅ This is the new line

              return (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  dueDate={project.due_date}
                  status={project.status}
                  totalTasks={project.total_tasks || 0} // fallback
                  completedTasks={project.completed_tasks || 0} // fallback
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
