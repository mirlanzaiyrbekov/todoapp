import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/layout";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
