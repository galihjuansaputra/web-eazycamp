function CustomerForm() {
    return (
        <>
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

export default CustomerForm;