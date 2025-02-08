import { Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="login" replace />
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ],
};

export default AuthRoutes;