import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import Student from "pages/Student";
import SignIn from "pages/SignIn";
import UserManagement from "pages/admin/UserManagement";
import CreateClass from "pages/teacher/CreateClass";
import ManageClass from "pages/teacher/ManageClass";
import Teacher from "pages/Teacher";
import UpdateClass from "pages/teacher/UpdateClass";
import AddTeacher from "pages/admin/AddTeacher";
import AddStudent from "pages/admin/AddStudent";

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
    path: "/teachers/class/create",
    element: <CreateClass />,
  },
  {
    path: "/teachers/class/:id",
    element: <ManageClass />,
  },
  {
    path: "/teachers/class/:id/update",
    element: <UpdateClass />,
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
    element: <UserManagement />,
  },
  {
    path: "/admin/teacher/create",
    element: <AddTeacher />,
  },
  {
    path: "/admin/student/:teacherId/create",
    element: <AddStudent />,
  },
]);

export default router;