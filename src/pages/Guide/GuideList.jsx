import GuideForm from "@pages/Guide/GuideForm.jsx";
import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import GuideService from "@services/GuideService.js";
import {useForm} from "react-hook-form";
import {IconId, IconTrash} from "@tabler/icons-react";
import {useQuery} from "react-query";
import Loading from "@shared/components/Loading.jsx";
import LocationService from "@services/LocationService.js";

const locationService = LocationService();

function GuideList() {
    const [searchParam, setSearchParam] = useSearchParams();
    const guideService = useMemo(() => GuideService(), []);
    const {handleSubmit, register} = useForm();
    const [locations, setLocations] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState(null);

    const handleOpenModal = (guide) => {
        setSelectedGuide(guide);
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await locationService.getAll();
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

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

    const handleDelete = async (id) => {
        if (!confirm("apakah yakin guide ini ingin dihapus?")) return;
        try {
            const response = await guideService.deleteById(id);
            if (response.statusCode === 200) {
                const data = await guideService.getAll();
                setPaging(data.paging);
                await refetch()
            }
        } catch (error) {
            console.log(error);
        }
    };

    const {data, isLoading, refetch} = useQuery({
        queryKey: ["guides", search, page, size, sortBy, direction],
        queryFn: async () => {
            return await guideService.getAll({
                location: search,
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

    if (isLoading) {
        return <Loading/>;
    }


    return (
        <>
            <div className="d-flex justify-content-between justify-content-center mb-3">
                <form className="flex-fill" onSubmit={handleSubmit(onSubmitSearch)} autoComplete="off">
                    <div className="input-group w-auto">

                        <select {...register("search")} defaultValue={""} className="form-select w-25"
                                aria-label="Default select example"
                                name="search"
                                id="search">
                            <option value="">All Location</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.name}>{location.name}</option>
                            ))}
                        </select>

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
                    Register Guide
                </button>
            </div>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Images</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Location</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.data.map((guide, index) => (
                        <tr key={guide.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <div style={{width: 72, height: 72}}>
                                    <img
                                        src={guide.images[0].url}
                                        style={{objectFit: "cover"}}
                                        className="img-thumbnail img-fluid w-100 h-100"
                                        alt={`Guide ${index + 1}`}
                                    />
                                </div>
                            </td>
                            <td>{guide.name}</td>
                            <td>{guide.userAccount && guide.userAccount.username}</td>
                            <td>{guide.phone}</td>
                            <td>{guide.location.name}</td>
                            <td>Rp. {separateThousands(guide.price)}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-info me-1 text-white"
                                    data-bs-toggle="modal"
                                    data-bs-target="#detailModal"
                                    onClick={() => handleOpenModal(guide)}
                                >
                                    <IconId style={{width: 18}}/>
                                </button>

                                <button
                                    onClick={() => handleDelete(guide.id)}
                                    className="btn btn-sm btn-danger text-white"
                                >
                                    <IconTrash style={{width: 18}}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">ID Info</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selectedGuide ? (
                                    <>
                                        <h2>{selectedGuide.name}</h2>
                                        <p>
                                            <strong>Username:</strong> {selectedGuide.userAccount && selectedGuide.userAccount.username}
                                        </p>
                                        <p><strong>Phone:</strong> {selectedGuide.phone}</p>
                                        <p><strong>Location:</strong> {selectedGuide.location.name}</p>
                                        <p><strong>Price:</strong> Rp. {separateThousands(selectedGuide.price)}</p>
                                        <div>
                                            {selectedGuide.images && selectedGuide.images.length > 0 ? (
                                                selectedGuide.images.map((image, index) => (
                                                    <img key={index} src={image.url} alt={`Image ${index}`}
                                                         className="img-fluid mb-2"/>
                                                ))
                                            ) : (
                                                <p>No images available</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger text-white"
                                        data-bs-dismiss="modal">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

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
            <GuideForm refetch={refetch}/>
        </>
    );
}

export default GuideList;