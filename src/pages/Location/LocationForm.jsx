import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useState} from "react";
import LocationService from "@services/LocationService.js";
import Swal from "sweetalert2";

const createSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name must be filled!"),
    description: z.string().min(1, "Description must be filled!"),
    recommendedActivity: z.string().min(1, "Recommended activity must be filled!"),
    safetyTips: z.string().min(1, "Safety tips must be filled!"),
    nearestStoreAddress: z.string().min(1, "Safety tips must be filled!"),
    images: z.any(),
});

const locationService = LocationService();

function LocationForm({refetch}) {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        clearErrors,
        reset,
        setValue,
        trigger,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(createSchema),
    });
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(
        ["https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"]
    );

    const handleImageChange = (e) => {
        setPreviewImage([])
        const {files} = e.target;
        const urlImages = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviewImage(prevImages => [...prevImages, ...urlImages]);
    };

    const handleBack = () => {
        clearForm();
        setPreviewImage(["https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"])

        navigate("/dashboard/location");
    };

    const onSubmit = async (data) => {
        try {
            const form = new FormData();

            // Serialize location object into JSON string
            const location = {
                name: data.name,
                description: data.description,
                recommendedActivity: data.recommendedActivity,
                safetyTips: data.safetyTips,
                nearestStoreAddress: data.nearestStoreAddress,
            };
            form.append("location", JSON.stringify(location));

            // Append each image separately
            for (let i = 0; i < data.images.length; i++) {
                form.append(`images`, data.images[i]);
            }

            await locationService.create(form);
            clearForm();
            navigate("/dashboard/location");
            // Show success message
            await Swal.fire({
                title: "Success",
                text: "Location has been created successfully.",
                icon: "success",
                timer: 2000, // Auto close timer in milliseconds
                showConfirmButton: false
            });
        } catch (err) {
            console.error("Error submitting form:", err);
            // Show error message
            await Swal.fire({
                title: "Error",
                text: "Failed to create location. Please try again later.\n" + err,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
        refetch();
        clearForm();
    };

    const clearForm = () => {
        clearErrors();
        reset();
    };

    return (
        <>
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Location Form
                            </h1>

                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                {/* Modal Table */}
                                <label htmlFor="name" className="mb-2">Location Name</label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="off"
                                    className={`form-control mb-3 rounded-1 ${errors.name && "is-invalid"}`}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name.message}</div>
                                )}

                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    {...register("description")}
                                    name="description"
                                    className={`form-control mb-3 ${errors.description && "is-invalid"}`}
                                    id="description"
                                    rows="3"
                                    style={{resize: "none"}}
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description.message}</div>
                                )}

                                <label htmlFor="recommendedActivity" className="form-label">Recommended Activity</label>
                                <textarea
                                    {...register("recommendedActivity")}
                                    name="recommendedActivity"
                                    className={`form-control mb-3 ${errors.recommendedActivity && "is-invalid"}`}
                                    id="recommendedActivity"
                                    rows="3"
                                    style={{resize: "none"}}
                                />
                                {errors.recommendedActivity && (
                                    <div className="invalid-feedback">{errors.recommendedActivity.message}</div>
                                )}

                                <label htmlFor="safetyTips" className="form-label">Safety Tips</label>
                                <textarea
                                    {...register("safetyTips")}
                                    name="safetyTips"
                                    className={`form-control mb-3 ${errors.safetyTips && "is-invalid"}`}
                                    id="safetyTips"
                                    rows="3"
                                    style={{resize: "none"}}
                                />
                                {errors.safetyTips && (
                                    <div className="invalid-feedback">{errors.safetyTips.message}</div>
                                )}

                                <label htmlFor="nearestStoreAddress" className="form-label">Nearest Store
                                    Address</label>
                                <textarea
                                    {...register("nearestStoreAddress")}
                                    name="nearestStoreAddress"
                                    className={`form-control mb-3 ${errors.nearestStoreAddress && "is-invalid"}`}
                                    id="nearestStoreAddress"
                                    rows="3"
                                    style={{resize: "none"}}
                                />
                                {errors.nearestStoreAddress && (
                                    <div className="invalid-feedback">{errors.nearestStoreAddress.message}</div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="images" className="form-label">
                                        <span>Gambar</span>
                                        <br/>
                                        <div className="preview-container">
                                            {previewImage.map((previewImage, index) => (
                                                <img
                                                    key={index}
                                                    src={previewImage}
                                                    alt={`Preview ${index + 1}`}
                                                    className="img-thumbnail img-fluid me-2 mb-2"
                                                    width={160}
                                                    height={160}
                                                />
                                            ))}
                                        </div>
                                    </label>
                                    <input
                                        {...register("images", {
                                            onChange: handleImageChange,
                                        })}
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        className={`form-control ${errors.images && "is-invalid"}`}
                                        name="images"
                                        id="images"
                                        multiple
                                    />
                                    {errors.images && (
                                        <div className="invalid-feedback">{errors.images.message}</div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button disabled={!isValid} type="submit" className="btn btn-success text-white"
                                        data-bs-dismiss="modal">
                                    Save
                                </button>
                                <button onClick={handleBack} type="button" className="btn btn-danger text-white"
                                        data-bs-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    );
}

export default LocationForm;