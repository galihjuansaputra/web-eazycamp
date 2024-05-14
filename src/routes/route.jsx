import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout.jsx";
import Home from "@pages/Home/Home.jsx";
import Login from "@pages/Authentication/Login/Login.jsx";
import Dashboard from "@pages/Dashboard/Dashboard.jsx";
import Products from "@pages/Products/Products.jsx";
import Transaction from "@pages/Transaction/Transaction.jsx";
import Admin from "@pages/Admin/Admin.jsx";
import ProtectedRoute from "@/routes/protectedRoute.jsx";
import CustomerForm from "@pages/Customer/CustomerForm.jsx";
import Customer from "@pages/Customer/Customer.jsx";
import Location from "@pages/Location/Location.jsx";
import LocationForm from "@pages/Location/LocationForm.jsx";
import Equipment from "@pages/Equipment/Equipment.jsx";
import Guide from "@pages/Guide/Guide.jsx";
import GuideForm from "@pages/Guide/GuideForm.jsx";

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
            <ProtectedRoute>
                <DashboardLayout/>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard/>,
            },
            {
                path: "equipment",
                element: <Equipment/>,
            },
            {
                path: "location",
                element: <Location/>,
            },
            {
                path: "guide",
                element: <Guide/>,
                children: [
                    {
                        path: ":id",
                        element: <GuideForm />,
                    },
                ],
            },
            {
                path: "customer",
                element: <Customer/>,
                children: [
                    {
                        path: ":id",
                        element: <CustomerForm />,
                    },
                ],
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
