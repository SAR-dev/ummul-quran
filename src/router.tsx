import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Student from "pages/Student";
import SignIn from "pages/SignIn";
import UserManagement from "pages/admin/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/students/:id",
    element: <Student />,
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/users" />,
  },
  {
    path: "/admin/users",
    element: <UserManagement />,
  },
]);

export default router;