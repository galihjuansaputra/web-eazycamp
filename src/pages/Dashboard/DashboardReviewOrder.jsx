import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardReviewOrder({ orders }) {
    const navigate = useNavigate();

    const pendingOrders = orders.filter(order => order.orderStatus === 'PENDING');
    const activeOrders = orders.filter(order => order.orderStatus === 'ACTIVE');

    const handleViewDetails = (orderId) => {
        navigate(`order/?orderId=${orderId}`);
    };

    return (
        <>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Pending Orders</h4>
                        <table className="table table-striped">
                            <thead className="table-dark">
                            <tr>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pendingOrders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.customer.name}</td>
                                    <td>{order.date}</td>
                                    <td className="text-secondary">{order.orderStatus}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary text-white fw-bold"
                                            onClick={() => handleViewDetails(order.id)}
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <h4>Active Orders</h4>
                        <table className="table table-striped">
                            <thead className="table-dark">
                            <tr>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {activeOrders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.customer.name}</td>
                                    <td>{order.date}</td>
                                    <td className="text-info">{order.orderStatus}</td>
                                    <td>
                                        <button
                                            className="btn btn-info text-white fw-bold"
                                            onClick={() => handleViewDetails(order.id)}
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </>
    );
}

export default DashboardReviewOrder;
