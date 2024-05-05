function Customer() {
    return (
        <>
            <h1 className="mt-4">Cutomer</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dolor dolore et fugit
                id inventore laudantium modi nostrum, praesentium, quis suscipit temporibus tenetur totam vel veritatis,
                vero voluptatibus.
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
        </>
    );
}

export default Customer;