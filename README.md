# 🏗️ SiteTask Tracker

A **full-stack web application** for managing civil engineering construction projects, their assigned tasks, and site workers — designed to streamline on-site project tracking and team coordination.

---

## 🚀 Overview

**SiteTask Tracker** was built to solve a real-world problem: managing multiple construction projects, timelines, and personnel across different sites. The app lets engineers and site supervisors:

* Create & manage construction projects
* Add tasks with deadlines and status
* Assign workers to tasks
* Track progress visually
* Manage responsibilities via a clear dashboard

The frontend is built in **React (Vite)**, styled with **CSS Modules**, and the backend is built with **Flask**, **PostgreSQL**, and **JWT** authentication.

---

## 🧠 Thought Process

My primary goal was to **build something production-ready**, clean, and easily extendable. Here's how I tackled it:

### 1. **Break the Problem into Core Entities**

* Projects → have many Tasks
* Tasks → assigned to Assignees
* Users → log in to manage their own view (auth protected)

### 2. **Focus on MVP Before Features**

Instead of perfecting everything at once, I structured the code for flexibility, starting with:

* Core CRUD for Projects, Tasks, Assignees
* Clean UI: Sidebar, Navbar, Project cards
* User Authentication
* Dashboard with summary views

### 3. **Component-First UI Development**

Before integrating with the backend, I built and styled each page & component:

* Project Cards
* Sidebar/Nav Layout
* Login/Register Forms

Only once UI worked smoothly did I integrate API endpoints.

### 4. **Keep It Clean and Modular**

* Separate folders for components, pages, styles
* Separate concerns: `AuthContext`, `ProtectedRoute`, API services
* CSS Modules for scoped, manageable styling

---

## 🛠️ Technologies Used

### Frontend

* **React (Vite)**
* **React Router**
* **Axios** for API requests
* **CSS Modules** for component styling
* **Context API** for Auth state

### Backend

* **Flask**
* **Flask-JWT-Extended**
* **Flask-Migrate**
* **Flask-CORS**
* **SQLAlchemy + PostgreSQL**

---

## 🔐 Authentication

The app uses **JWT tokens** for secure login:

* Auth tokens stored in Context (in-memory)
* `ProtectedRoute` wrapper restricts access to internal pages
* On logout, token is cleared and user is redirected

---

## 🧪 Seed Data

To test the app with data:

```bash
# Run the seed script (adjust if needed)
python seed.py
```

This populates:

* Sample Projects
* Tasks linked to projects
* Assignees for tasks

---

## 🧰 Setup Instructions

```bash
cd server
pipenv shell
flask run
```

* DB: PostgreSQL
* Ensure `.env` or hardcoded config has DB URI
* Run migrations:

  ```bash
  flask db init
  flask db migrate -m "Initial"
  flask db upgrade
  ```

```bash
cd client
npm install
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)
Backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 📸 Key Features

* 🔐 Register/Login system
* 🗂️ Create, update & delete projects
* ✅ Track tasks & completion progress
* 👷🏾 Assign team members
* 📊 View dashboard summaries
* 💻 Responsive layout with sidebar and navbar
* ⚙️ Protected routes for authenticated users

---

## 📁 Folder Structure (Frontend)

```touch
client/
├── components/         # Navbar, Sidebar, ProjectCard etc.
├── pages/              # Projects, Tasks, Dashboard etc.
├── context/            # AuthContext and custom hooks
├── services/           # Axios API wrapper
├── styles/             # CSS modules per component/page
└── App.jsx             # Main routes & layout
```

---

## ✅ What I’d Do Next

* 🌐 Persist auth token with `localStorage`
* 🧑‍💻 Role-based permissions for engineers vs site supervisors
* 📱 Mobile responsive styling
* 🧪 Add unit tests and Postman collection for testing

---

## 📣 Final Notes

SiteTask Tracker reflects a real-world workflow, from initial concept to component-driven development, backend wiring, user auth, and production-ready UI. It’s built with **clarity, structure, and future scaling** in mind.

> 💬 *“Designed to make construction site management as seamless as clicking a button.”*
