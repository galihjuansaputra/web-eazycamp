import {IconChevronDown, IconEdit, IconTrash} from "@tabler/icons-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useQuery} from "react-query";
import Loading from "@shared/components/Loading.jsx";
import React from "react";
import OrderService from "@services/OrderService.js";

function OrderList() {

    const [searchParam, setSearchParam] = useSearchParams();
    const orderService = useMemo(() => OrderService(), []);
    const {handleSubmit, register} = useForm();

    const navigate = useNavigate();
    const [orderId, setOrderId] = useState();

    const search = searchParam.get("orderId") || "";
    const direction = searchParam.get("direction") || "asc";
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

    const selectId = async (id) => {
        setOrderId(id)
    }

    const onSubmitSearch = ({search}) => {
        setSearchParam({orderId: search || "", direction: direction, page: "1", size: size, sortBy: sortBy});
    };

    const handleNextPage = () => {
        if (page >= paging.totalPages) return;
        setSearchParam({orderId: "", page: +page + 1, size: size, direction: direction, sortBy: sortBy});
    };

    const handlePreviousPage = () => {
        if (page <= 1) return;
        setSearchParam({orderId: "", page: +page - 1, size: size, direction: direction, sortBy: sortBy});
    };

    const navigatePage = (page) => {
        if (!page) return;
        setSearchParam({orderId: "", page: page, size: size, direction: direction, sortBy: sortBy});
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

    console.log(data)
    /* TODO: list data into table. */

    const separateThousands = (number) => {
        return number.toLocaleString();
    }

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <>
            <div className="d-flex justify-content-between justify-content-center mb-3">
                <form className="flex-fill" onSubmit={handleSubmit(onSubmitSearch)} autoComplete="off">
                    <div className="input-group w-auto">

                        <input
                            {...register("search")}
                            type="search"
                            name="search"
                            id="search"
                            className="form-control w-25" placeholder="Search by order id"
                            aria-label="Recipient's username" aria-describedby="button-addon2"/>

                        <select value={direction} className="form-select w-25" id="inputGroupSelect01"
                                onChange={(e) => {
                                    setSearchParam({name: search, page, size, sortBy, direction: e.target.value});
                                }}
                        >
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>

                        <select value={size} className="form-select w-25" id="inputGroupSelect02"
                                onChange={(e) => {
                                    setSearchParam({name: search, page, direction, sortBy, size: e.target.value});
                                }}
                        >
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>

                        <button className="btn btn-outline-secondary w-25" type="submit" id="button-addon2">Search
                        </button>

                    </div>
                </form>
            </div>

            {/* Button trigger modal */}
            <div>
                <button
                    type="button"
                    className="btn btn-primary text-white mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Add Order
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>

                    </tr>
                    </thead>
                    {data &&
                        data.data.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <tbody>
                                <tr>
                                    <th scope="col">{++index}</th>
                                    <td scope="col">{order.id}</td>
                                    <td scope="col">{order.customer.name}</td>
                                    <td scope="col">{order.stock}</td>
                                    <td scope="col">{order.paymentType}</td>
                                    <td scope="col">
                                        <button
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${order.id}`} aria-expanded="false"
                                            aria-controls="collapseExample"
                                            className="btn btn-info text-white d-flex justify-content-center align-items-center"
                                            style={{width: 36, height: 36, padding: 0}}>
                                            <IconChevronDown/>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>

                                <tbody>
                                <tr>
                                    <td colSpan="7" className="m-0 p-0 border-0 table-dark">

                                        <div className="collapse" id={order.id}>
                                            <div className="container-fluid my-3">
                                                <h6 className="fw-bold mt-3">Order Details</h6>
                                                <p className="fw-light">{order.description}</p>
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