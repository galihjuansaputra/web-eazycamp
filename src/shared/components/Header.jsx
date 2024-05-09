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
                        <span>
                            {user.username}
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;