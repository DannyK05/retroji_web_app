import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./modules/auth";
import Chat from "./modules/chat";
import Scoop from "./modules/scoop";
import Snapz from "./modules/snapz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/scoops",
    element: <Scoop />,
  },
  {
    path: "/snapz",
    element: <Snapz />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
