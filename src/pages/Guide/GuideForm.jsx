import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useEffect, useState} from "react";
import GuideService from "@services/GuideService.js";
import AuthService from "@services/AuthService.js";
import * as bootstrap from 'bootstrap';
import Swal from "sweetalert2";
import LocationService from "@services/LocationService.js";
import PropTypes from 'prop-types'

const createSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "name wajib di isi!"),
    username: z.string().min(1, "username wajib di isi!"),
    password: z.string().min(8, "password harus lebih dari 8 karakter!"),
    phone: z.string().min(1, "phone number wajib di isi!"),
    price: z.string().min(1, "price wajib di isi!"),
    location: z.string().min(1, "location wajib di isi!"),
    images: z.any()
});

const updateSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "name wajib di isi!"),
    username: z.string().min(1, "username wajib di isi!"),
    phone: z.string().min(1, "phone number wajib di isi!"),
    price: z.string().min(1, "price wajib di isi!"),
    location: z.string().min(1, "location wajib di isi!"),
    images: z.any()
});

const guideService = GuideService();
const authService = AuthService();
const locationService = LocationService();

function GuideForm({refetch}) {
    const [locations, setLocations] = useState([]);

    const {id} = useParams();

    const [previewImage, setPreviewImage] = useState(
        ["https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"]
    );

    const handleImageChange = (e) => {
        setPreviewImage([])
        const {files} = e.target;
        const urlImages = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviewImage(prevImages => [...prevImages, ...urlImages]);
    };

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
        resolver: zodResolver(id ? updateSchema : createSchema),
    });
    const navigate = useNavigate();

    const handleBack = () => {
        clearForm();
        navigate("/dashboard/guide");
    };

    const onSubmit = async (data) => {
        if (data.id) {
            try {
                const guide = {
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    phone: data.phone,
                    price: data.price,
                };
                await guideService.update(guide);
                clearForm();
                navigate("/dashboard/guide");
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const form = new FormData();

                const guide = {
                    name: data.name,
                    username: data.username,
                    password: data.password,
                    price: data.price,
                    phone: data.phone,
                    location: data.location,
                };
                form.append("guide", JSON.stringify(guide));

                // Append each image separately
                for (let i = 0; i < data.images.length; i++) {
                    form.append(`images`, data.images[i]);
                }

                await authService.registerGuide(form);
                clearForm();
                navigate("/dashboard/guide");
            } catch (err) {
                console.log(err);
            }
        }
        refetch();
    };

    const clearForm = () => {
        clearErrors();
        reset();
        setPreviewImage(["https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"])
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

        if (id) {
            window.onload = () => {
                const myModal = new bootstrap.Modal('#staticBackdrop');
                myModal.show();
            }

            const getProductById = async () => {
                try {
                    const response = await guideService.getById(id);
                    const currentProduct = response.data;
                    setValue("id", currentProduct.id);
                    setValue("name", currentProduct.name);
                    setValue("username", currentProduct.userAccount.username);
                    setValue("phone", currentProduct.phone);
                    setValue("price", currentProduct.price);
                    setValue("location", currentProduct.location.id);
                    setValue("images", currentProduct.images);

                    // Fetch each image from its URL and create object URLs
                    const previewImages = await Promise.all(currentProduct.images.map(async (image) => {
                        const imageUrl = image.url;
                        const response = await fetch(imageUrl);
                        const blob = await response.blob();
                        return URL.createObjectURL(blob);
                    }));

                    // Set preview images
                    setPreviewImage(previewImages);
                    trigger();
                } catch (error) {
                    console.log(error);
                    await navigate("/dashboard/guide");
                    Swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    })

                }
            };
            getProductById();
        } else {
            clearForm();
        }
        fetchLocations();
    }, [id, setValue, trigger]);


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
                                Guide Form
                            </h1>

                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">

                                {/*    Modal Table */}

                                <label htmlFor="name" className="mb-2">Name</label>
                                <input
                                    {...register("name")}
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control form-control mb-3 rounded-1"/>

                                <label htmlFor="phone" className="mb-2">Phone Number</label>
                                <input
                                    {...register("phone")}
                                    autoComplete="off"
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="form-control form-control mb-3 rounded-1"/>

                                <label htmlFor="username" className="mb-2">Username</label>
                                <input
                                    {...register("username")}
                                    autoComplete="off"
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control form-control mb-3 rounded-1"/>

                                <label htmlFor="password" className="mb-2">Password</label>
                                <input
                                    {...register("password")}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control form-control mb-3 rounded-1"/>

                                <label htmlFor="location" className="mb-2">Location</label>
                                <select {...register("location")} defaultValue={""} id="location" className="form-select mb-3"
                                        aria-label="Default select example">
                                    <option value="" disabled>Select Location</option>
                                    {locations.map(location => (
                                        <option key={location.id} value={location.id}>{location.name}</option>
                                    ))}
                                </select>

                                <label htmlFor="price" className="mb-2">Rate</label>
                                <input
                                    {...register("price")}
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="form-control form-control mb-3 rounded-1"/>

                                <div className="mb-3">
                                    <label htmlFor="images" className="form-label">
                                        <span>Images</span>
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

export default GuideForm;

GuideForm.propTypes = {
    refetch: PropTypes.func
}