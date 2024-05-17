import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useEffect} from "react";
import CustomerService from "@services/CustomerService.js";
import AuthService from "@services/AuthService.js";
import * as bootstrap from 'bootstrap';
import Swal from "sweetalert2";

const createSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(6, "name harus lebih dari 6 karakter!"),
    username: z.string().min(6, "username harus lebih dari 6 karakter!"),
    password: z.string().min(8, "password harus lebih dari 8 karakter!"),
    phone: z.string().min(1, "phone number wajib di isi!"),
});

const updateSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "name wajib di isi!"),
    username: z.string().min(1, "username wajib di isi!"),
    phone: z.string().min(1, "phone number wajib di isi!"),
});


const customerService = CustomerService();
const authService = AuthService();


function CustomerForm(refetch) {
    const {id} = useParams();

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
        navigate("/dashboard/customer");
    };

    const onSubmit = async (data) => {
        if (data.id) {
            try {
                const customer = {
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    phone: data.phone,
                };
                await customerService.update(customer);
                clearForm();
                await Swal.fire({
                    title: 'Success',
                    text: 'Customer updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/dashboard/customer");
            } catch (err) {
                console.log(err);
                await Swal.fire({
                    title: 'Error',
                    text: 'There was an error updating the customer. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            try {
                const customer = {
                    name: data.name,
                    username: data.username,
                    password: data.password,
                    phone: data.phone,
                };
                const response = await authService.registerCustomer(customer);
                console.log(response);
                clearForm();
                await Swal.fire({
                    title: 'Success',
                    text: 'Customer created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/dashboard/customer");
            } catch (err) {
                console.log(err);
                await Swal.fire({
                    title: 'Error',
                    text: 'There was an error creating the customer. Please try again.\n'+err,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
        clearForm()
        refetch.refetch();
    };


    const clearForm = () => {
        clearErrors();
        reset();
    };

    useEffect(() => {
        if (id) {
            window.onload = () => {
                const myModal = new bootstrap.Modal('#staticBackdrop');
                myModal.show();
            }

            const getProductById = async () => {
                try {
                    const response = await customerService.getById(id);
                    const currentProduct = response.data;
                    setValue("id", currentProduct.id);
                    setValue("name", currentProduct.name);
                    setValue("username", currentProduct.userAccount.username);
                    setValue("phone", currentProduct.phone);
                    trigger();
                } catch (error) {
                    console.log(error);
                    await navigate("/dashboard/customer");
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
                                Customer Form
                            </h1>

                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <label htmlFor="name" className="mb-2">Name</label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="off"
                                    className={`form-control form-control mb-3 rounded-1 ${errors.name ? 'is-invalid' : ''}`}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}

                                <label htmlFor="phone" className="mb-2">Phone Number</label>
                                <input
                                    {...register("phone")}
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    className={`form-control form-control mb-3 rounded-1 ${errors.phone ? 'is-invalid' : ''}`}
                                />
                                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}

                                <label htmlFor="username" className="mb-2">Username</label>
                                <input
                                    {...register("username")}
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    className={`form-control form-control mb-3 rounded-1 ${errors.username ? 'is-invalid' : ''}`}
                                />
                                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}

                                <label htmlFor="password" className="mb-2">Password</label>
                                <input
                                    {...register("password")}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={`form-control form-control mb-3 rounded-1 ${errors.password ? 'is-invalid' : ''}`}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                            </div>

                            <div className="modal-footer">
                                <button disabled={!isValid} type="submit" className="btn btn-success text-white"
                                        data-bs-dismiss="modal">
                                    Save
                                </button>
                                <button
                                    onClick={() => console.log("Handle back")}
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

export default CustomerForm;