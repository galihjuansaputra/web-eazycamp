import Sidebar from "@shared/components/Sidebar.jsx";
import Header from "@shared/components/Header.jsx";
import {Outlet} from "react-router-dom";
import Breadcrumbs from "@shared/components/Breadcrumbs.jsx";

function DashboardLayout() {

    return (
        <>
            <div className="d-flex" id="wrapper">
                {/* Sidebar*/}
                <Sidebar/>

                {/* Page content wrapper*/}
                <div id="page-content-wrapper">
                    {/* Top navigation*/}
                    <Header/>

                    {/* Page content*/}
                    <div className="container-fluid mb-3">
                        <Breadcrumbs />
                        <Outlet/>

                    </div>
                </div>
            </div>

        </>
    );
}

export default DashboardLayout;