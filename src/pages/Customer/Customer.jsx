import CustomerForm from "@pages/Customer/CustomerForm.jsx";

function Customer() {
    return (
        <>
            <h1 className="my-4">Customer</h1>
            <hr/>

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

            <div
                className="d-flex flex-column flex-sm-row flex- justify-content-between align-items-center">
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
            <CustomerForm/>
        </>
    );
}

export default Customer;