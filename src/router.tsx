import { createBrowserRouter,RouterProvider } from "react-router-dom";

import { Layout } from "./components";
import { FlightOrders } from "./pages";
import { ScheduledFlights } from "./pages/ScheduledFlights";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ScheduledFlights />,
      },
      {
        path: "/orders",
        element: <FlightOrders />,
      },
      {
        path: "/orders/:departure/:arrival/:day",
        element: <FlightOrders />,
      },
    ],
  },
]);

export const Router = () => (
  <>
    <RouterProvider router={router} />
  </>
);
