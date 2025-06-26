import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/projects/")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 bg-gray-800 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="text-blue-400 hover:underline"
              >
                View Details →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;
