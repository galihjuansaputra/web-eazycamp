import {IconChevronDown} from "@tabler/icons-react";
import {useSearchParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useQuery} from "react-query";
import Loading from "@shared/components/Loading.jsx";
import React from "react";
import OrderService from "@services/OrderService.js";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import Swal from "sweetalert2";

function OrderList() {
    const [searchParam, setSearchParam] = useSearchParams();
    const orderService = useMemo(() => OrderService(), []);
    const {handleSubmit, register} = useForm();
    const search = searchParam.get("orderId") || "";
    const direction = searchParam.get("direction") || "desc";
    const sortBy = searchParam.get("sortBy") || "date";
    const page = searchParam.get("page") || "1";
    const size = searchParam.get("size") || "10";

    const [paging, setPaging] = useState({
        page: page,
        size: size,
        totalElement: 0,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
    });

    // const selectId = async (id) => {
    //     setOrderId(id)
    // }

    const onSubmitSearch = ({search}) => {
        setSearchParam({
            orderId: search || "",
            direction: direction,
            page: "1",
            size: size,
            sortBy: sortBy,
        });
    };

    const handleNextPage = () => {
        if (page >= paging.totalPages) return;
        setSearchParam({
            orderId: "",
            page: +page + 1,
            size: size,
            direction: direction,
            sortBy: sortBy,
        });
    };

    const handlePreviousPage = () => {
        if (page <= 1) return;
        setSearchParam({
            orderId: "",
            page: +page - 1,
            size: size,
            direction: direction,
            sortBy: sortBy,
        });
    };

    const navigatePage = (page) => {
        if (!page) return;
        setSearchParam({
            orderId: "",
            page: page,
            size: size,
            direction: direction,
            sortBy: sortBy,
        });
    };

    const {data, isLoading, refetch} = useQuery({
        queryKey: ["orders", search, page, size, sortBy, direction],
        queryFn: async () => {
            if (search !== "") {
                return await orderService.getAll({
                    orderId: search,
                    page: page,
                    size: size,
                    direction: direction,
                    sortBy: sortBy,
                });
            } else {
                return await orderService.getAll({
                    page: page,
                    size: size,
                    direction: direction,
                    sortBy: sortBy,
                });
            }
        },
        onSuccess: (data) => {
            setPaging(data.paging);
        },
    });

    useEffect(() => {
        refetch()
    }, [])

    if (isLoading) {
        return <Loading/>;
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-secondary';
            case 'ACTIVE':
                return 'text-info';
            case 'FINISHED':
                return 'text-success';
            default:
                return '';
        }
    };

    const handleAcceptOrder = async (orderId) => {
        const swalCustom = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success text-white fw-bold me-2",
                cancelButton: "btn btn-danger text-white fw-bold"
            },
            buttonsStyling: false
        });
        swalCustom.fire({
            title: "Do you want to accept the order?",
            showCancelButton: true,
            icon: "info",
            confirmButton: "btn btn-success",
            confirmButtonText: "Accept",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await orderService.acceptOrder(orderId);
                Swal.fire("Accepted!", "", "success");
                await refetch();
            }
        });
    }

    const handleRejectOrder = async (orderId) => {
        return 0;
    }

    const handleFinishOrder = async (orderId) => {
        return 0;
    }

    return (
        <>
            <div className="d-flex justify-content-between justify-content-center mb-3">
                <form
                    className="flex-fill"
                    onSubmit={handleSubmit(onSubmitSearch)}
                    autoComplete="off"
                >
                    <div className="input-group w-auto">
                        <input
                            {...register("search")}
                            type="search"
                            name="search"
                            id="search"
                            className="form-control w-25"
                            placeholder="Search by order id"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                        />

                        <select
                            value={direction}
                            className="form-select w-25"
                            id="inputGroupSelect01"
                            onChange={(e) => {
                                setSearchParam({
                                    name: search,
                                    page,
                                    size,
                                    sortBy,
                                    direction: e.target.value,
                                });
                            }}
                        >
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>

                        <select
                            value={size}
                            className="form-select w-25"
                            id="inputGroupSelect02"
                            onChange={(e) => {
                                setSearchParam({
                                    name: search,
                                    page,
                                    direction,
                                    sortBy,
                                    size: e.target.value,
                                });
                            }}
                        >
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>

                        <button
                            className="btn btn-outline-secondary w-25"
                            type="submit"
                            id="button-addon2"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Button trigger modal */}
            <div>
                <Link className="btn btn-primary text-white mb-3" to="/dashboard/order/new">
                    Tambah Transaksi
                </Link>
            </div>

            {/* list order */}
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Guide Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Order Status</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    {data &&
                        data.data.map((order) => (
                            <React.Fragment key={order.id}>
                                <tbody
                                    className="cursor-pointer"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${order.id}`}
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                <tr>
                                    <td scope="col">{order.id}</td>
                                    <td scope="col">{order.date}</td>
                                    <td scope="col">{order.customer.name}</td>
                                    <td scope="col">{order.guide ? order.guide.name : "--"}</td>
                                    <td scope="col">{order.location.name}</td>
                                    <td scope="col">
                                        <div className={getStatusClass(order.orderStatus)}>
                                            {order.orderStatus}
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <IconChevronDown size={32}/>
                                    </td>

                                </tr>
                                </tbody>

                                <tbody>
                                <tr>
                                    <td colSpan="7" className="m-0 p-0 border-0 table-dark">
                                        <div className="collapse" id={order.id}>
                                            <div className="container-fluid my-3">
                                                <div className="row">
                                                    <div className="col-12 col-md-3">
                                                        <h6 className="fw-bold">Guarantee Image</h6>
                                                        <img
                                                            className="img-fluid m-1"
                                                            width={200}
                                                            height={200}
                                                            src={order.orderGuaranteeImage && order.orderGuaranteeImage.url}
                                                            alt={order.orderGuaranteeImage && order.orderGuaranteeImage.url}
                                                        />
                                                        <h6 className="fw-bold mt-3">Rent Day</h6>
                                                        <p className="fw-light">{order.day}</p>
                                                        <h6 className="fw-bold">Order Type</h6>
                                                        <p className="fw-light">{order.orderType}</p>
                                                        <h6 className="fw-bold">Payment Type</h6>
                                                        <p className="fw-light">{order.paymentType}</p>
                                                    </div>
                                                    <div className="col-12 col-md-9">
                                                        <h6 className="fw-bold">Customer Sent Address (Sent Order
                                                            Type)</h6>
                                                        <p className="fw-light">{order.sentAddress ? order.sentAddress : "--"}</p>
                                                        <h6 className="fw-bold">Payment Status</h6>
                                                        <p className="fw-light">{order.payment ? order.payment.status : "--"}</p>
                                                        <h6 className="fw-bold">Payment Url</h6>
                                                        <p className="fw-light">
                                                            <a href={order.payment ? order.payment.url : "#"}>
                                                                {order.payment ? order.payment.url : "Waiting for review"}
                                                            </a>
                                                        </p>
                                                        <h6 className="fw-bold">Order Equipment Details</h6>
                                                        <table className="table table-striped align-middle">
                                                            <thead className="table-dark">
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Equipment</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Sub Total</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {order.orderEquipments.map((detail, index) => (
                                                                <tr key={detail.id}>
                                                                    <td scope="col">{++index}</td>
                                                                    <td scope="col">
                                                                        {detail.equipment.name} ({order.day} days)
                                                                    </td>
                                                                    <td scope="col">{detail.quantity}</td>
                                                                    <td scope="col">
                                                                        {detail.equipment.price * order.day * detail.quantity}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td colSpan="3" className="text-center">
                                                                    <b>GrandTotal</b>
                                                                </td>
                                                                <td>
                                                                    {order.orderEquipments.reduce(
                                                                        (sum, detail) =>
                                                                            sum + detail.equipment.price * order.day * detail.quantity,
                                                                        0
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <button
                                                            onClick={() => handleAcceptOrder(order.id)}
                                                            className={`btn btn-success text-white fw-bold me-2 ${order.payment && order.payment.status !== "ACTIVE" ? "disabled" : ""}`}>
                                                            Accept Order
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectOrder(order.id)}
                                                            className={`btn btn-danger text-white fw-bold me-2 ${order.payment && order.payment.status !== "ACTIVE" ? "disabled" : ""}`}>
                                                            Reject Order
                                                        </button>
                                                        <button
                                                            onClick={() => handleFinishOrder(order.id)}
                                                            className={`btn btn-info text-white fw-bold me-2 ${order.payment && order.payment.status !== "ACTIVE" ? "" : "disabled"}`}>
                                                            Finish Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </React.Fragment>
                        ))}
                </table>
            </div>

            <div className="d-flex flex-column-reverse flex-sm-row justify-content-between align-items-center">
                <small>
                    Show data {data && data.data?.length} of {paging.totalElement}
                </small>
                <nav aria-label="Page navigation example">
                    <ul className="pagination mb-sm-0">
                        <li
                            className={`page-item ${!paging.hasPrevious ? "disabled" : ""}`}
                        >
                            <button
                                disabled={!paging.hasPrevious}
                                onClick={handlePreviousPage}
                                className="page-link"
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(paging.totalPages)].map((_, index) => {
                            const currentPage = index + 1;
                            return (
                                <li
                                    key={index}
                                    className={`page-item ${
                                        paging.page === currentPage ? "active" : ""
                                    }`}
                                >
                                    <button
                                        onClick={() => navigatePage(currentPage)}
                                        className="page-link"
                                    >
                                        {currentPage}
                                    </button>
                                </li>
                            );
                        })}
                        <li className={`page-item ${!paging.hasNext ? "disabled" : ""}`}>
                            <button
                                disabled={!paging.hasNext}
                                className="page-link"
                                onClick={handleNextPage}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default OrderList;
