import CustomerForm from "@pages/Customer/CustomerForm.jsx";
import {useMemo, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import CustomerService from "@services/CustomerService.js";
import {useForm} from "react-hook-form";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useQuery} from "react-query";
import Loading from "@shared/components/Loading.jsx";
import CustomerCart from "@pages/Customer/CustomerCart.jsx";

function CustomerList() {
    const [searchParam, setSearchParam] = useSearchParams();
    const customerService = useMemo(() => CustomerService(), []);
    const {handleSubmit, register} = useForm();

    const [carts, setCarts] = useState()

    const navigate = useNavigate();

    const search = searchParam.get("name") || "";
    const direction = searchParam.get("direction") || "asc";
    const sortBy = searchParam.get("sortBy") || "name";
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

    const handleCarts = async (id) => {
        const response = await customerService.getById(id);
        setCarts(response.data.carts);
    }

    const onSubmitSearch = ({search}) => {
        setSearchParam({name: search || "", direction: direction, page: "1", size: size, sortBy: sortBy});
    };

    const handleNextPage = () => {
        if (page >= paging.totalPages) return;
        setSearchParam({name: "", page: +page + 1, size: size, direction: direction, sortBy: sortBy});
    };

    const handlePreviousPage = () => {
        if (page <= 1) return;
        setSearchParam({name: "", page: +page - 1, size: size, direction: direction, sortBy: sortBy});
    };

    const navigatePage = (page) => {
        if (!page) return;
        setSearchParam({name: "", page: page, size: size, direction: direction, sortBy: sortBy});
    };

    const handleDelete = async (id) => {
        if (!confirm("apakah yakin customer ini ingin dihapus?")) return;
        try {
            const response = await customerService.deleteById(id);
            if (response.statusCode === 200) {
                const data = await customerService.getAll();
                setPaging(data.paging);
                await refetch()
            }
        } catch (error) {
            console.log(error);
        }
    };

    const {data, isLoading, refetch} = useQuery({
        queryKey: ["customers", search, page, size, sortBy, direction],
        queryFn: async () => {
            return await customerService.getAll({
                name: search,
                page: page,
                size: size,
                direction: direction,
                sortBy: sortBy,
            });
        },
        onSuccess: (data) => {
            setPaging(data.paging);
        },
    });

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
                            className="form-control w-25" placeholder="Search by name"
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
                    Register Customer
                </button>
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Cart</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {data &&
                        data.data.map((customer, index) => (
                            <tr key={customer.id}>
                                <th scope="row">{index + 1 + size * (page - 1)}</th>
                                <td>{customer.name}</td>
                                <td>{customer.userAccount && customer.userAccount.username}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    <button
                                        onClick={()=> {handleCarts(customer.id)}}
                                        type="button"
                                        className="btn btn-sm btn-info text-white"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdropCart"
                                    >
                                        Detail
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
                                        className="btn btn-sm btn-danger text-white"
                                    >
                                        <IconTrash style={{width: 18}}/>
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
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
            <CustomerForm refetch={refetch}/>
            <CustomerCart refetch={refetch} carts={carts}/>
        </>
    );
}

export default CustomerList;