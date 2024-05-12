import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useEffect, useState} from "react";
import * as bootstrap from 'bootstrap';
import Swal from "sweetalert2";
import LocationService from "@services/LocationService.js";

const createSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name must be filled!"),
    description: z.string().min(1, "Description must be filled!"),
    recommendedActivity: z.string().min(1, "Recommended activity must be filled!"),
    safetyTips: z.string().min(1, "Safety tips must be filled!"),
    images: z.any()
});

const locationService = LocationService();

function LocationForm(refetch) {

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
            };
            form.append("location", JSON.stringify(location));

            // Append each image separately
            for (let i = 0; i < data.images.length; i++) {
                form.append(`images`, data.images[i]);
            }

            await locationService.create(form);
            clearForm();
            navigate("/dashboard/location");
        } catch (err) {
            console.error("Error submitting form:", err);
        }
        refetch.refetch();
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

                                {/*    Modal Table */}

                                <label className="mb-2">Location Name</label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control form-control mb-3 rounded-1"/>

                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    {...register("description")}
                                    name="description"
                                    className="form-control mb-3" id="description" rows="3" style={{resize: "none"}}/>

                                <label htmlFor="recommendedActivity" className="form-label">Recommended Activity</label>
                                <textarea
                                    {...register("recommendedActivity")}
                                    name="recommendedActivity"
                                    className="form-control mb-3" id="recommendedActivity" rows="3"
                                    style={{resize: "none"}}/>

                                <label htmlFor="safetyTips" className="form-label">Safety Tips</label>
                                <textarea
                                    {...register("safetyTips")}
                                    name="safetyTips"
                                    className="form-control mb-3" id="safetyTips" rows="3"
                                    style={{resize: "none"}}/>

                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <span>Gambar</span>
                                        <br/>
                                        <div className="preview-container">
                                            {previewImage.map((previewImage, index) => (
                                                <img
                                                    key={index}
                                                    src={previewImage}
                                                    alt={`Preview ${index + 1}`}
                                                    className="img-thumbnail img-fluid"
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
                                <button
                                    onClick={handleBack}
                                    type="button"
                                    className="btn btn-danger text-white"
                                    data-bs-dismiss="modal"
                                >
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