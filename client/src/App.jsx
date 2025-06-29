// src/App.jsx
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
import AuthProvider from "./context/AuthProvider"; // Import AuthProvider

import "./App.css";

const App = () => {
  return (
    <Router>
      {" "}
      {/* Router is now the outermost component */}
      <AuthProvider>
        {" "}
        {/* AuthProvider is now INSIDE the <Router> */}
        <div className="app-layout">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <main className="main-body">
              <Routes>
                {/* 🔓 Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* 🔒 Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <ProtectedRoute>
                      <ProjectView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mytasks"
                  element={
                    <ProtectedRoute>
                      <MyTasks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assignees"
                  element={
                    <ProtectedRoute>
                      <Assignees />
                    </ProtectedRoute>
                  }
                />

                {/* fallback to dashboard if path is unknown */}
                <Route
                  path="*"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
