import {IconChevronDown, IconEdit, IconTrash} from "@tabler/icons-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMemo, useState} from "react";
import EquipmentService from "@services/EquipmentService.js";
import {useForm} from "react-hook-form";
import {useQuery} from "react-query";
import Loading from "@shared/components/Loading.jsx";
import React from "react";
import EquipmentForm from "@pages/Equipment/EquipmentForm.jsx";

function EquipmentList() {

    const [searchParam, setSearchParam] = useSearchParams();
    const equipmentService = useMemo(() => EquipmentService(), []);
    const {handleSubmit, register} = useForm();

    const navigate = useNavigate();
    const [equipmentId, setEquipmentId] = useState();

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

    const selectId = async (id) => {
        setEquipmentId(id)
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

    const {data, isLoading, refetch} = useQuery({
        queryKey: ["equipments", search, page, size, sortBy, direction],
        queryFn: async () => {
            return await equipmentService.getAll({
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

    const separateThousands = (number) => {
        return number.toLocaleString();
    }

    const handleDelete = async (id) => {
        if (!confirm("apakah yakin customer ini ingin dihapus?")) return;
        try {
            const response = await equipmentService.deleteById(id);
            if (response.statusCode === 200) {
                const data = await equipmentService.getAll();
                setPaging(data.paging);
                await refetch()
            }
        } catch (error) {
            console.log(error);
        }
    };


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
                    Add Equipment
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>

                    </tr>
                    </thead>

                    {data &&
                        data.data.map((equipment, index) => (
                            <React.Fragment key={equipment.id}>
                                <tbody>
                                <tr>
                                    <th scope="col">{index + 1 + size * (page - 1)}</th>
                                    <td scope="col">
                                        <div style={{width: 72, height: 72}}>
                                            <img
                                                src={equipment.images[0].url}
                                                style={{objectFit: "cover"}}
                                                className="img-thumbnail img-fluid w-100 h-100"
                                            />
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className="fw-bold">{equipment.name}</div>
                                        <div className="fw-light">Rp. {separateThousands(equipment.price)}</div>
                                    </td>
                                    <td scope="col">{equipment.stock}</td>
                                    <td scope="col">
                                        <div>
                                            <button
                                                onClick={() => {
                                                    navigate(`${equipment.id}`)
                                                    selectId(equipment.id)
                                                }}
                                                type="button"
                                                className="btn btn-sm btn-secondary me-1 text-white"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                            >
                                                <IconEdit style={{width: 18}}/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(equipment.id)}
                                                className="btn btn-danger btn-sm text-white">
                                                <IconTrash style={{width: 18}}/>
                                            </button>
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <button
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${equipment.id}`} aria-expanded="false"
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

                                        <div className="collapse" id={equipment.id}>
                                            <div className="container-fluid my-3">
                                                <div id={`carouselExampleIndicators-${equipment.id}`}
                                                     className="carousel slide">
                                                    <div className="carousel-indicators">
                                                        {equipment.images && equipment.images.map((image, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                data-bs-target={`#carouselExampleIndicators-${equipment.id}`}
                                                                data-bs-slide-to={index}
                                                                className={index === 0 ? "active" : ""}
                                                                aria-current={index === 0 ? "true" : undefined}
                                                                aria-label={`Slide ${index + 1}`}
                                                            ></button>
                                                        ))}
                                                    </div>

                                                    <div className="carousel-inner">
                                                        {equipment.images && equipment.images.map((image, index) => (
                                                            <div key={index}
                                                                 className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                                <img src={image.url} className="d-block w-100"
                                                                     style={{height: 240, objectFit: "contain"}}
                                                                     alt={image.url}/>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button className="carousel-control-prev" type="button"
                                                            data-bs-target={`#carouselExampleIndicators-${equipment.id}`}
                                                            data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon"
                                                          aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button"
                                                            data-bs-target={`#carouselExampleIndicators-${equipment.id}`}
                                                            data-bs-slide="next">
                                                    <span className="carousel-control-next-icon"
                                                          aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>

                                                <h6 className="fw-bold mt-3">Product Description</h6>
                                                <p className="fw-light">{equipment.description}</p>
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
            <EquipmentForm refetch={refetch} equipmentId={equipmentId}/>
        </>
    );
}

export default EquipmentList;