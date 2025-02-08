import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Main/Home";
import Task from "../pages/Main/Task";

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "task/:id",
        element: <Task />,
      },
    ]
}

export default MainRoutes;
