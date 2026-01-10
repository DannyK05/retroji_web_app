import { createBrowserRouter, RouterProvider } from "react-router";
import { ApiMessageProvider } from "./components/common/message-banner/context";
import StoreProvider from "./store/provider";
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
      { path: "/chats", Component: Chat },
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
  return (
    <ApiMessageProvider>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </ApiMessageProvider>
  );
}

export default App;
