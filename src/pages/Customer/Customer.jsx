import {Outlet} from "react-router-dom";
import CustomerForm from "@pages/Customer/CustomerForm.jsx";
import CustomerList from "@pages/Customer/CustomerList.jsx";

function Customer() {
    return (
        <>
            <CustomerList/>
            <CustomerForm/>
        </>
    );
}

export default Customer;