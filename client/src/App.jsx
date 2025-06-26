import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectView";
import Tasks from "./pages/Tasks";
import MyTasks from "./pages/MyTasks";
import Assignees from "./pages/Assignees";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import routes from "./routes";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectView />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/mytasks" element={<MyTasks />} />
              <Route path="/assignees" element={<Assignees />} />
              <Route path="*" element={<Projects />} />{" "}
              {/* Default/fallback route */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
