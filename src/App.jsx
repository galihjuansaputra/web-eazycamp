import {
    IconBuildingStore,
    IconDashboard,
    IconLogout,
    IconMenu2, IconPlus,
    IconReceipt,
    IconUserCog,
    IconUsers
} from "@tabler/icons-react";

window.addEventListener('DOMContentLoaded', () => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

function App() {

    return (
        <>
            <div className="d-flex" id="wrapper">
                {/* Sidebar*/}
                <div className="border-end bg-dark" id="sidebar-wrapper">
                    <div className="p-0 d-flex justify-content-center sidebar-heading bg-dark">
                        <img
                            src="/src/assets/eazy_camp.png"
                            style={{height: 180, margin: 0}}
                            alt="Eazy Camp Logo"/>
                    </div>
                    <div className="list-group list-group-flush p-3">

                        <a
                            className="d-flex align-items-center cursor-pointer border-bottom-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4"

                        >
                            <IconDashboard style={{marginRight: 10}}/>
                            <span>Dashboard</span>

                        </a>
                        <a
                            className="d-flex align-items-center cursor-pointer border-bottom-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4"
                        >
                            <IconBuildingStore style={{marginRight: 10}}/>
                            <span>Products</span>
                        </a>
                        <a
                            className="d-flex align-items-center cursor-pointer border-bottom-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4"
                        >
                            <IconUsers style={{marginRight: 10}}/>
                            Customer
                        </a>
                        <a
                            className="d-flex align-items-center cursor-pointer border-bottom-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4"
                        >
                            <IconReceipt style={{marginRight: 10}}/>
                            Transaction
                        </a>
                        <a
                            className="d-flex align-items-center cursor-pointer border-bottom-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4"
                        >
                            <IconUserCog style={{marginRight: 10}}/>
                            Admin
                        </a>
                        <a
                            className="d-flex align-items-center cursor-pointer border-bottom-0 list-group-item list-group-item-action list-group-item-dark p-3 mb-2 rounded-4"
                        >
                            <IconLogout style={{marginRight: 10}}/>
                            Log Out
                        </a>
                    </div>
                </div>
                {/* Page content wrapper*/}
                <div id="page-content-wrapper">
                    {/* Top navigation*/}
                    <nav className="bg-dark navbar navbar-expand-lg navbar-light border-bottom">
                        <div className="container-fluid">
                            <button className="btn btn-primary text-white" id="sidebarToggle">
                                <IconMenu2/>
                            </button>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <a className="nav-link">
                                            Home
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            Link
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Dropdown
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <a className="dropdown-item">
                                                Action
                                            </a>
                                            <a className="dropdown-item">
                                                Another action
                                            </a>
                                            <div className="dropdown-divider"/>
                                            <a className="dropdown-item">
                                                Something else here
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* Page content*/}
                    <div className="container-fluid">
                        <h1 className="mt-4">Simple Sidebar</h1>
                        <p>
                            The starting state of the menu will appear collapsed on smaller screens,
                            and will appear non-collapsed on larger screens. When toggled using the
                            button below, the menu will change.
                        </p>

                        <div className="d-flex justify-content-between justify-content-center mb-3">

                            <div className="input-group w-auto">
                                <input type="text" className="form-control" placeholder="Recipient's username"
                                       aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search
                                </button>
                            </div>
                            {/* Button trigger modal */}
                            <div>

                                <button
                                    type="button"
                                    className="btn btn-primary text-white ms-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                >
                                    Add Data
                                </button>
                            </div>


                        </div>

                        <table className="table">
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>Bird</td>
                                <td>@twitter</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="d-flex flex-column flex-sm-row flex- justify-content-between align-items-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>

                            <div>
                                <p>Results 1 to 10 of 254</p>
                            </div>
                        </div>

                        {/* Modal */}
                        <div
                            className="modal fade"
                            id="staticBackdrop"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex={-1}
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                            Modal title
                                        </h1>

                                    </div>
                                    <div className="modal-body">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                            <input type="text" className="form-control" placeholder="Username"
                                                   aria-label="Username" aria-describedby="basic-addon1"/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control"
                                                   placeholder="Recipient's username" aria-label="Recipient's username"
                                                   aria-describedby="basic-addon2"/>
                                            <span className="input-group-text" id="basic-addon2">@example.com</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="basic-url" className="form-label">Your vanity URL</label>
                                            <div className="input-group">
                                                <span className="input-group-text"
                                                      id="basic-addon3">https://example.com/users/</span>
                                                <input type="text" className="form-control" id="basic-url"
                                                       aria-describedby="basic-addon3 basic-addon4"/>
                                            </div>
                                            <div className="form-text" id="basic-addon4">Example help text goes outside
                                                the input group.
                                            </div>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">$</span>
                                            <input type="text" className="form-control"
                                                   aria-label="Amount (to the nearest dollar)"/>
                                            <span className="input-group-text">.00</span>
                                        </div>

                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Username"
                                                   aria-label="Username"/>
                                            <span className="input-group-text">@</span>
                                            <input type="text" className="form-control" placeholder="Server"
                                                   aria-label="Server"/>
                                        </div>

                                        <div className="input-group">
                                            <span className="input-group-text">With textarea</span>
                                            <textarea className="form-control" aria-label="With textarea"></textarea>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success text-white"
                                                data-bs-dismiss="modal">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger text-white"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default App
