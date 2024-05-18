import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import EquipmentService from "@services/EquipmentService.js";
import {number} from "zod";

const createSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name must be at least 1 character long!").max(255, "Name cannot exceed 255 characters!"),
    description: z.string().min(1, "Description must be at least 1 character long!").max(255, "Description cannot exceed 255 characters!"),
    price: z.string().or(number()).refine((val) => !isNaN(parseFloat(val)), "harga harus berupa angka")
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0, "harga harus lebih dari 0"),
    stock: z.string().or(number()).refine((val) => !isNaN(parseFloat(val)), "stock harus berupa angka")
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0, "stock harus lebih dari 0"),
    images: z.any()
});

const equipmentService = EquipmentService();

function EquipmentForm({refetch}) {

    const {equipmentId} = useParams();

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
        navigate("/dashboard/equipment");
    };

    const onSubmit = async (data) => {
        if (data.id) {
            try {
                const form = new FormData();

                // Serialize equipment object into JSON string
                const equipment = {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                };
                form.append("equipment", JSON.stringify(equipment));

                // Append each image separately
                for (let i = 0; i < data.images.length; i++) {
                    form.append(`images`, data.images[i]);
                }

                await equipmentService.update(form);
                clearForm();
                await Swal.fire({
                    title: 'Success',
                    text: 'Equipment updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/dashboard/equipment");
            } catch (err) {
                console.error("Error submitting form:", err);
                await Swal.fire({
                    title: 'Error',
                    text: 'There was an error updating the equipment. Please try again.\n' + err,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            try {
                const form = new FormData();

                // Serialize equipment object into JSON string
                const equipment = {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                };
                form.append("equipment", JSON.stringify(equipment));

                // Append each image separately
                for (let i = 0; i < data.images.length; i++) {
                    form.append(`images`, data.images[i]);
                }

                await equipmentService.create(form);
                clearForm();
                await Swal.fire({
                    title: 'Success',
                    text: 'Equipment created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/dashboard/equipment");
            } catch (err) {
                console.error("Error submitting form:", err);
                await Swal.fire({
                    title: 'Error',
                    text: 'There was an error creating the equipment. Please try again.' + err,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
        clearForm()
        refetch();
    };

    const clearForm = () => {
        clearErrors();
        reset();
        setPreviewImage(["https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"])
    };

    useEffect(() => {
        if (equipmentId) {

            const getProductById = async () => {
                try {
                    const response = await equipmentService.getById(equipmentId);
                    const currentProduct = response.data;
                    setValue("id", currentProduct.id);
                    setValue("name", currentProduct.name);
                    setValue("description", currentProduct.description);
                    setValue("price", currentProduct.price);
                    setValue("stock", currentProduct.stock);
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
                    await navigate("/dashboard/equipment");
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
    }, [equipmentId, setValue, trigger]);

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
                                Equipment Form
                            </h1>

                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                {/* Product Name */}
                                <label htmlFor="name" className="mb-2">Product Name</label>
                                <input
                                    {...register("name")}
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={`form-control mb-3 rounded-1 ${errors.name ? "is-invalid" : ""}`}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name.message}</div>
                                )}

                                {/* Description */}
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    {...register("description")}
                                    name="description"
                                    className={`form-control mb-3 ${errors.description ? "is-invalid" : ""}`}
                                    id="description"
                                    rows="3"
                                    style={{resize: "none"}}
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description.message}</div>
                                )}

                                {/* Price */}
                                <label htmlFor="price" className="mb-2">Price</label>
                                <input
                                    {...register("price")}
                                    type="number"
                                    min={1}
                                    name="price"
                                    id="price"
                                    className={`form-control mb-3 rounded-1 ${errors.price ? "is-invalid" : ""}`}
                                />
                                {errors.price && (
                                    <div className="invalid-feedback">{errors.price.message}</div>
                                )}

                                {/* Stock */}
                                <label htmlFor="stock" className="mb-2">Stock</label>
                                <input
                                    {...register("stock")}
                                    type="number"
                                    min={1}
                                    name="stock"
                                    id="stock"
                                    className={`form-control mb-3 rounded-1 ${errors.stock ? "is-invalid" : ""}`}
                                />
                                {errors.stock && (
                                    <div className="invalid-feedback">{errors.stock.message}</div>
                                )}

                                {/* Images */}
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
                                        className={`form-control ${errors.images ? "is-invalid" : ""}`}
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

export default EquipmentForm;