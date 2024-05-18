
import { Outlet } from "react-router-dom";

function Order() {
    return (
        <>
            <h1 className="my-4">Transaction</h1>
            <hr/>

            <Outlet/>
        </>
    );
}

export default Order;