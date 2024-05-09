import {
    IconBuildingStore,
    IconDashboard,
    IconLogout,
    IconMountain,
    IconReceipt,
    IconUserCog,
    IconUsers
} from "@tabler/icons-react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {

        Swal.fire({
            title: "Do you want to log out?",
            showCancelButton: true,
            confirmButtonText: "Log Out",
            confirmButtonColor: "red"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                localStorage.clear();
                navigate('/login')
            }
        });
    }

    return (
        <>
            <div className="border-end bg-dark" id="sidebar-wrapper">
                <div className="p-0 d-flex justify-content-center sidebar-heading bg-dark">
                    <img
                        src="/src/assets/eazy_camp.png"
                        style={{height: 180, margin: 0}}
                        alt="Eazy Camp Logo"/>
                </div>
                <div className="list-group list-group-flush p-3">


                    <Link to="/dashboard" className="text-decoration-none d-flex align-items-center cursor-pointer border-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4">
                            <IconDashboard style={{marginRight: 10}}/>
                            <span>Dashboard</span>
                    </Link>

                    <Link to="/dashboard/products" className="text-decoration-none d-flex align-items-center cursor-pointer border-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4">
                        <IconBuildingStore style={{marginRight: 10}}/>
                        <span>Products</span>
                    </Link>

                    <Link to="/dashboard/location" className="text-decoration-none d-flex align-items-center cursor-pointer border-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4">
                            <IconMountain style={{marginRight: 10}}/>
                            Location
                    </Link>

                    <Link to="/dashboard/customer" className="text-decoration-none d-flex align-items-center cursor-pointer border-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4">
                            <IconUsers style={{marginRight: 10}}/>
                            Customer
                    </Link>

                    <Link to="/dashboard/transaction" className="text-decoration-none d-flex align-items-center cursor-pointer border-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4">
                            <IconReceipt style={{marginRight: 10}}/>
                            Transaction
                    </Link>

                    <Link to="/dashboard/admin" className="text-decoration-none d-flex align-items-center cursor-pointer border-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4">
                            <IconUserCog style={{marginRight: 10}}/>
                            Admin
                    </Link>

                    <a onClick={handleLogout} className="text-decoration-none d-flex align-items-center cursor-pointer border-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4">
                            <IconLogout style={{marginRight: 10}}/>
                            Log Out
                    </a>
                </div>
            </div>
        </>
);
}

export default Sidebar;