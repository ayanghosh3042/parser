import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import Button from "../Design/Button";
import { Link, useNavigate } from "react-router";
import InputField from "../Design/InputField";
const LoginForm = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row h-dvh linear-bg-1">
            <div className="linear-bg-2 flex flex-col justify-center-safe items-center-safe gap-5 w-1/2 rounded-tr-[250px] rounded-br-[150px]  text-white">
                <div className="text-5xl font-extrabold">Hello, Welcome!</div>
                <p className="text-xl">Do not have an account?</p>
                <Button
                    onClick={() => {
                        navigate("/register");
                    }}
                >
                    Register
                </Button>
            </div>
            <div className="flex flex-col gap-5 w-1/2 items-center justify-center ">
                <form
                    onSubmit={() => {
                        alert("Do you want to submit");
                    }}
                    className="flex flex-col min-w-sm gap-4"
                >
                    <label className="text-3xl font-bold self-center">
                        Login
                    </label>
                    <InputField type="text" placeholder="Username" />
                    <InputField
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <p className="self-end">forgot password?</p>
                    <Button type="submit" className="btn-2 w-full">
                        Login
                    </Button>
                </form>

                <p className="self-center-safe">login with social platforms</p>
                <div className="grid grid-cols-4 gap-10 px-2 max-w-sm text-5xl">
                    <FcGoogle />
                    <FaLinkedin />
                    <FaGithub />
                    <FaFacebookSquare />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
