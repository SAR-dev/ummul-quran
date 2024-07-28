import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import Student from "pages/Student";
import SignIn from "pages/SignIn";

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
]);

export default router;