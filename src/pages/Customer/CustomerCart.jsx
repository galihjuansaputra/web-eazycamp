function CustomerCart() {
    return (
        <>
            <div
                className="modal fade"
                id="staticBackdropCart"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Customer Form
                            </h1>

                        </div>
                        <div className="modal-body">

                            {/*    Modal Table */}
                            <div className="card mb-3" style={{ maxWidth: 540 }}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                        <img src="/src/assets/react.svg" className="img-fluid rounded-start" alt="Product Image" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Product Title</h5>
                                            <p className="card-text">
                                                Quantity: 324152
                                            </p>
                                            <p className="card-text">
                                                <small className="text-body-secondary">$$$$$$</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerCart;