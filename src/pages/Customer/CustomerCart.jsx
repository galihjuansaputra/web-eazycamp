function CustomerCart({refetch, carts}) {
    console.log(carts)
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
                            {
                                carts && carts.length > 0 ? (
                                    carts.map((cart, index) => (
                                        <div key={index} className="card mb-3" style={{ maxWidth: 540 }}>
                                            <div className="row g-0">
                                                <div className="col-md-4 d-flex justify-content-center align-items-center">
                                                    <img src={cart.equipment.images[0].url} className="img-fluid rounded-start" alt="Product Image" />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{cart.equipment.name}</h5>
                                                        <p className="card-text">
                                                            Quantity: {cart.quantity}
                                                        </p>
                                                        <p className="card-text">
                                                            <small className="text-body-secondary">Rp. {cart.equipment.price}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No items in the cart</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerCart;