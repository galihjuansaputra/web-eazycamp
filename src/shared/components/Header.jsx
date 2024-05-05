import {IconMenu2} from "@tabler/icons-react";

function Header() {
    const toggleSidebar = (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
    return (
        <>
            <nav className="bg-dark navbar navbar-expand-lg navbar-light border-bottom">
                <div className="container-fluid">
                    <button onClick={toggleSidebar} className="btn btn-primary text-white" id="sidebarToggle">
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
        </>
    );
}

export default Header;