import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import AuthService from "@services/AuthService.js";
import Swal from "sweetalert2";

function ProtectedRoute({ children }) {
    const authService = AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("user"))
        const checkToken = async () => {
            if ( !localStorage.getItem("user") || !(await authService.validateToken()) ) {
                navigate("/login");
            }
        };

        const checkAdmin = async () => {
            const roles = storage.roles;
            if (!roles.includes("ROLE_ADMIN")){
                navigate("/login")
                localStorage.clear()
                Swal.fire({
                    title: "Access Denied",
                    icon: "error"
                });
            }
        }

        console.log(storage.roles);

        checkAdmin();
        checkToken();
    }, [authService, navigate]);

    return <>{children}</>;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoute;
