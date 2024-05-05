import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout.jsx";
import Customer from "@/pages/Customer/Customer.jsx";
import Home from "@pages/Home/Home.jsx";
import Login from "@pages/Authentication/Login/Login.jsx";
import Dashboard from "@pages/Dashboard/Dashboard.jsx";
import Products from "@pages/Products/Products.jsx";
import Transaction from "@pages/Transaction/Transaction.jsx";
import Admin from "@pages/Admin/Admin.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/dashboard",
        element: (
                <DashboardLayout/>
        ),
        children: [
            {
                index: true,
                element: <Dashboard/>,
            },
            {
                path: "products",
                element: <Products/>,
            },
            {
                path: "customer",
                element: <Customer/>,
            },
            {
                path: "transaction",
                element: <Transaction/>,
            },
            {
                path: "admin",
                element: <Admin/>,
            },

        ]
    },
]);

export default router;
