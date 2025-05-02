import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import Chat from "./modules/chat";
import Scoop from "./modules/scoops";
import Snapz from "./modules/snapz";
import Layout from "./components/layouts/Layout";
import SignUp from "./modules/auth/signup/index.";
import SignIn from "./modules/auth/signin/index.";
import ResetPassword from "./modules/auth/reset-password/ResetPassword";

const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      { path: "/", Component: SignIn },
      { path: "/signup", Component: SignUp },
      { path: "/reset-password", Component: ResetPassword },
    ],
  },
  {
    Component: Layout,
    children: [
      { path: "/chart", Component: Chat },
      {
        path: "/scoops",
        element: <Scoop />,
      },
      {
        path: "/snapz",
        element: <Snapz />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
