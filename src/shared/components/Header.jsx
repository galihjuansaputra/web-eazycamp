import {IconMenu2} from "@tabler/icons-react";

function Header() {
    const toggleSidebar = (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }

    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <>
            <nav className="bg-dark navbar navbar-expand-lg navbar-light border-bottom">
                <div className="container-fluid">
                    <button onClick={toggleSidebar} className="btn btn-primary text-white" id="sidebarToggle">
                        <IconMenu2/>
                    </button>
                    <div>
                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link">
                                    {user.username}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;