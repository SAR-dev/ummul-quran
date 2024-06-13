import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import Student from "pages/Student";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/students/:id",
    element: <Student />,
  },
]);

export default router;