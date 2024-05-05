import {Link} from "react-router-dom";

function Login() {
    return (
        <>
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img style={{height: 200, margin: 16, marginTop: 0, marginBottom: 0,}} className="img-fluid"
                         src="/src/assets/eazy_camp.png" alt="Eazy Camp Logo"/>
                    <div className="d-flex flex-column p-4 rounded-2 border border-1 bg-dark">
                        <form action="">
                            <label className="mb-2">Username</label>
                            <input className="form-control form-control-lg mb-3 rounded-1" type="text"/>
                            <label className="mb-2">Password</label>
                            <input className="form-control form-control-lg mb-3 rounded-1" type="password"/>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                <Link to="/dashboard">
                                    <button type="button" className="btn btn-primary text-white rounded-1">Log in</button>
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;