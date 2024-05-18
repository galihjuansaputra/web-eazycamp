function DashboardInfo({totalCustomers,totalEquipment,totalGuides,totalLocation,totalOrders}) {


    return (
        <>
            <div>
                <div className="d-flex flex-lg-row flex-column justify-content-start">
                    <div className="card text-bg-primary mb-3 me-2 text-white">
                        <div className="card-header">Total Customer</div>
                        <div className="card-body">
                            <h1 className="card-title">{totalCustomers}</h1>
                        </div>
                    </div>
                    <div className="card text-bg-secondary mb-3 me-2 text-white">
                        <div className="card-header">Total Equipment</div>
                        <div className="card-body">
                            <h1 className="card-title">{totalEquipment}</h1>
                        </div>
                    </div>
                    <div className="card text-bg-info mb-3 me-2 text-white">
                        <div className="card-header">Total Order</div>
                        <div className="card-body">
                            <h1 className="card-title">{totalOrders}</h1>
                        </div>
                    </div>
                    <div className="card text-bg-success mb-3 me-2 text-white">
                        <div className="card-header">Total Guide</div>
                        <div className="card-body">
                            <h1 className="card-title">{totalGuides}</h1>
                        </div>
                    </div>
                    <div style={{backgroundColor: "#7E2E84"}} className="card mb-3 me-2 text-white">
                        <div className="card-header">Total Location</div>
                        <div className="card-body">
                            <h1 className="card-title">{totalLocation}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardInfo;
