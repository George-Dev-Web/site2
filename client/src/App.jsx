import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectView";
import Tasks from "./pages/Tasks";
import MyTasks from "./pages/MyTasks";
import Assignees from "./pages/Assignees";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Sidebar />
                  <div className="main-content">
                    <Navbar />
                    <main className="main-body">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectView />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/mytasks" element={<MyTasks />} />
                        <Route path="/assignees" element={<Assignees />} />
                        <Route path="*" element={<Projects />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
