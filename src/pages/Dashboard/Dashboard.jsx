import React, { useState, useEffect } from 'react';
import DashboardInfo from "@pages/Dashboard/DashboardInfo.jsx";
import DashboardReviewOrder from "@pages/Dashboard/DashboardReviewOrder.jsx";
import GuideService from "@services/GuideService.js";
import CustomerService from "@services/CustomerService.js";
import EquipmentService from "@services/EquipmentService.js";
import OrderService from "@services/OrderService.js";
import LocationService from "@services/LocationService.js";

function Dashboard() {
    const [totalGuides, setTotalGuides] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalEquipment, setTotalEquipment] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalLocation, setTotalLocation] = useState(0);
    const [orders, setOrders] = useState([]);

    const guideService = GuideService();
    const customerService = CustomerService();
    const equipmentService = EquipmentService();
    const orderService = OrderService();
    const locationService = LocationService();

    const fetchGuideServiceData = async () => {
        try {
            let totalGuides = 0;
            let page = 1;
            let response;

            do {
                response = await guideService.getAll({page: page});
                totalGuides += response.data.length;
                page++;
            } while (response.paging && response.paging.hasNext);

            setTotalGuides(totalGuides);
        } catch (error) {
            console.error("Error fetching guide service data:", error);
        }
    };

    const fetchCustomerServiceData = async () => {
        try {
            let totalCustomers = 0;
            let page = 1;
            let response;

            do {
                response = await customerService.getAll({page: page});
                totalCustomers += response.data.length;
                page++;
            } while (response.paging && response.paging.hasNext);

            setTotalCustomers(totalCustomers);
        } catch (error) {
            console.error("Error fetching customer service data:", error);
        }
    };

    const fetchEquipmentServiceData = async () => {
        try {
            let totalEquipment = 0;
            let page = 1;
            let response;

            do {
                response = await equipmentService.getAll({page: page});
                totalEquipment += response.data.length;
                page++;
            } while (response.paging && response.paging.hasNext);

            setTotalEquipment(totalEquipment);
        } catch (error) {
            console.error("Error fetching equipment service data:", error);
        }
    };

    const fetchOrderServiceData = async () => {
        try {
            let allOrders = [];
            let totalOrders = 0;
            let page = 1;
            let response;

            do {
                response = await orderService.getAll({ page: page });
                allOrders = allOrders.concat(response.data);
                totalOrders += response.data.length;
                page++;
            } while (response.paging && response.paging.hasNext);

            setTotalOrders(totalOrders);
            setOrders(allOrders);
        } catch (error) {
            console.error("Error fetching order service data:", error);
        }
    };


    const fetchLocationServiceData = async () => {
        try {
            let totalLocation = 0;
            let page = 1;
            let response;

            do {
                response = await locationService.getAll({page: page});
                totalLocation += response.data.length;
                page++;
            } while (response.paging && response.paging.hasNext);

            setTotalLocation(totalLocation);
        } catch (error) {
            console.error("Error fetching order service data:", error);
        }
    };

    useEffect(() => {
        // Fetch data for GuideService
        fetchGuideServiceData();

        // Fetch data for CustomerService
        fetchCustomerServiceData();

        // Fetch data for EquipmentService
        fetchEquipmentServiceData();

        // Fetch data for OrderService
        fetchOrderServiceData();

        fetchLocationServiceData()
    }, []);

    return (
        <>
            <h1 className="my-4">Dashboard</h1>
            <hr/>
            <DashboardInfo
                totalGuides={totalGuides}
                totalCustomers={totalCustomers}
                totalEquipment={totalEquipment}
                totalOrders={totalOrders}
                totalLocation={totalLocation}
            />
            <DashboardReviewOrder orders={orders} />
        </>
    );
}

export default Dashboard;
