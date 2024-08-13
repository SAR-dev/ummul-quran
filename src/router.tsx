import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Student from "pages/Student";
import SignIn from "pages/SignIn";
import UserManagement from "pages/admin/UserManagement";
import CreateClass from "pages/teacher/CreateClass";
import ManageClass from "pages/teacher/ManageClass";
import Teacher from "pages/Teacher";

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
    path: "/teachers/create-class",
    element: <CreateClass />,
  },
  {
    path: "/teachers/class/:id",
    element: <ManageClass />,
  },
  {
    path: "/students/:id",
    element: <Student />,
  },
  {
    path: "/teachers/:id",
    element: <Teacher />,
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