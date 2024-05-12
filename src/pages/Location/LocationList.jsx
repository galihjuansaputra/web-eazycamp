import {IconChevronDown} from "@tabler/icons-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMemo, useState} from "react";
import LocationService from "@services/LocationService.js";
import {useForm} from "react-hook-form";
import {useQuery} from "react-query";
import Loading from "@shared/components/Loading.jsx";
import React from "react";
import LocationForm from "@pages/Location/LocationForm.jsx";

function LocationList() {

    const [searchParam, setSearchParam] = useSearchParams();
    const customerService = useMemo(() => LocationService(), []);
    const {handleSubmit, register} = useForm();

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
                    Add Location
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-striped align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Location Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>

                    </tr>
                    </thead>

                    {data &&
                        data.data.map((location, index) => (
                            <React.Fragment key={location.id}>
                                <tbody className="cursor-pointer" data-bs-toggle="collapse"
                                       data-bs-target={`#${location.id}`} aria-expanded="false"
                                       aria-controls="collapseExample">
                                <tr>
                                    <th scope="col">{++index}</th>
                                    <td scope="col">{location.name}</td>
                                    <td scope="col">{location.description}</td>
                                    <td scope="col"><IconChevronDown size={32}/></td>
                                </tr>
                                </tbody>

                                <tbody>
                                <tr>
                                    <td colSpan="4" className="m-0 p-0 border-0 table-dark">

                                        <div className="collapse" id={location.id}>
                                            <div className="container-fluid my-3">
                                                <div id={`carouselExampleIndicators-${location.id}`}
                                                     className="carousel slide">
                                                    <div className="carousel-indicators">
                                                        {location.images && location.images.map((image, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                data-bs-target={`#carouselExampleIndicators-${location.id}`}
                                                                data-bs-slide-to={index}
                                                                className={index === 0 ? "active" : ""}
                                                                aria-current={index === 0 ? "true" : undefined}
                                                                aria-label={`Slide ${index + 1}`}
                                                            ></button>
                                                        ))}
                                                    </div>

                                                    <div className="carousel-inner">
                                                        {location.images && location.images.map((image, index) => (
                                                            <div key={index}
                                                                 className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                                <img src={image.url} className="d-block w-100"
                                                                     style={{height: 240, objectFit: "cover"}}
                                                                     alt={image.url}/>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button className="carousel-control-prev" type="button"
                                                            data-bs-target={`#carouselExampleIndicators-${location.id}`}
                                                            data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon"
                                                          aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button"
                                                            data-bs-target={`#carouselExampleIndicators-${location.id}`}
                                                            data-bs-slide="next">
                                                    <span className="carousel-control-next-icon"
                                                          aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>

                                                <h6 className="fw-bold mt-3">Recommended Activity</h6>
                                                <p className="fw-light">{location.recommendedActivity}</p>
                                                <h6 className="fw-bold">Safety Tips</h6>
                                                <p className="fw-light">{location.safetyTips}</p>
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
            <LocationForm refetch={refetch}/>
        </>
    );
}

export default LocationList;