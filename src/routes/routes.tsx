import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/login/Login";
import CustomerDetails from "../pages/customerDetail/CustomerDetails";
import CustomerDataList from "../pages/customerList/CustomerDataList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <CustomerDataList />,
  },
  {
    path: "/customer-details",
    element: <CustomerDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
