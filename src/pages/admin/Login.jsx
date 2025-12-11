//import hook react
import React, { useState, useEffect } from "react";

//import BASE URL API
import Api from "../../api";

//import toats
import toast from "react-hot-toast";

//import js cookie
import Cookies from "js-cookie";

//import react router dom
import { useNavigate } from "react-router-dom";

function Login() {

    //title page
    document.title = "Login - Administrator Travel GIS";

    //navigate
    const navigate = useNavigate();

    //state user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //state loading
    const [isLoading, setLoading] = useState(false);

    //state validation
    const [validation, setValidation] = useState({});

    //redirect if already logged in
    useEffect(() => {
        if (Cookies.get("token")) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        await Api.post("/api/admin/login", {
            email: email,
            password: password,
        })
        .then((response) => {
            setLoading(false);

            toast.success("Login Successfully.", {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            Cookies.set("token", response.data.token);

            //redirect dashboard page
            navigate("/admin/dashboard");
        })
        .catch((error) => {
            setLoading(false);
            setValidation(error.response.data);
        });
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 mt-150">
                        <div className="text-center mb-4">
                            <h4><i className="fa fa-map-marked-alt"></i> <strong>TRAVEL GIS</strong></h4>
                        </div>
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="text-center">
                                    <h6 className="fw-bold">LOGIN ADMIN</h6>
                                    <hr />
                                </div>
                                {validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )}
                                <form onSubmit={loginHandler}>
                                    <label className="mb-1">EMAIL ADDRESS</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    {validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email[0]}
                                        </div>
                                    )}

                                    <label className="mb-1">PASSWORD</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                        />
                                    </div>
                                    {validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )}

                                    <button
                                        className="btn btn-success shadow-sm rounded-sm px-4 w-100"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "LOADING..." : "LOGIN"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
