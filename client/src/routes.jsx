import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectView";
import Tasks from "./pages/Tasks";
import MyTasks from "./pages/MyTasks";
import Assignees from "./pages/Assignees";

const routes = [
  { path: "/projects", element: <Projects /> },
  { path: "/projects/:id", element: <ProjectView /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/mytasks", element: <MyTasks /> },
  { path: "/assignees", element: <Assignees /> },
];

export default routes;
