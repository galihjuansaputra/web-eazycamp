import {useEffect, useMemo} from "react";
import AuthService from "@services/AuthService.js";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";

const schema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong"),
    password: z
        .string()
        .min(8, "Password setidaknya harus lebih dari 8 karakter"),
});


function Login() {

    const authService = useMemo(() => AuthService(), []);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await authService.login(data);
            if (response && response.statusCode === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/dashboard");
            }
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Login gagal",
                text: error,
            });
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const checkToken = async () => {
                const isValidToken = await authService.validateToken();
                if (isValidToken) {
                    navigate("/dashboard");
                }
            };
            checkToken();
        }
    }, [authService, navigate]);

    return (
        <>
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img style={{height: 200, margin: 16, marginTop: 0, marginBottom: 0,}} className="img-fluid"
                         src="/src/assets/eazy_camp.png" alt="Eazy Camp Logo"/>
                    <div className="d-flex flex-column p-4 rounded-2 border border-1 bg-dark">

                        {/*Form Login*/}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="mb-2">Username</label>
                            <input
                                {...register("username")}
                                type="text"
                                name="username"
                                id="username"
                                className="form-control form-control-lg mb-3 rounded-1"/>

                            <label className="mb-2">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                name="password"
                                id="password"
                                className="form-control form-control-lg mb-3 rounded-1"/>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"id="flexCheckDefault" value=""/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                    <button disabled={!isValid} type="submit" className="btn btn-primary text-white rounded-1">Log in
                                    </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;