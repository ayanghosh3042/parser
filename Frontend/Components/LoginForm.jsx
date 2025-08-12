import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import Button from "../Design/Button";
import { Link, useNavigate } from "react-router";
const LoginForm = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row h-dvh bg-gradient-to-r from-indigo-800 via-purple-500 to-pink-500">
            <div className="bg-linear-to-r/srgb from-indigo-500 to-teal-400 flex flex-col justify-center-safe items-center-safe gap-5 bg-blue-600/85 w-1/2 rounded-tr-[250px] rounded-br-[150px]  text-white">
                <div className="text-5xl font-extrabold">Hello, Welcome!</div>
                <p className="text-xl">Do not have an account?</p>
                <Button
                    className="hover:bg-emerald-400/90"
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
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-gray-300 h-15 px-4 rounded-2xl text-xl"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="bg-gray-300 h-15 px-4 rounded-2xl text-xl"
                    />
                    <p className="self-end">forgot password?</p>
                    <Button
                        type="submit"
                        className="bg-blue-600 h-15 px-4 rounded-2xl text-xl w-full border-none"
                    >
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
