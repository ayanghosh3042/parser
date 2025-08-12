import React from "react";
import Button from "../Design/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";

const RegisterForm = () => {
    const navigate = useNavigate();
    return (
        <div className="h-dvh flex flex-row-reverse bg-gradient-to-r from-indigo-800 via-purple-500 to-pink-500">
            <div className="bg-linear-to-r/srgb from-indigo-500 to-teal-400 flex flex-col justify-center-safe items-center-safe gap-5 bg-blue-600/85 w-1/2 rounded-tl-[250px] rounded-bl-[150px]  text-white">
                <p className="text-5xl font-extrabold">welcome Back!</p>
                <p className="text-xl">already have an account?</p>
                <Button
                    className="hover:bg-emerald-400/90"
                    onClick={() => navigate("/login")}
                >
                    Login
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
                        Registration
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-gray-300 h-15 px-4 rounded-2xl text-xl"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className="bg-gray-300 h-15 px-4 rounded-2xl text-xl"
                    />
                    <input
                        type="text"
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

                <p className="self-center-safe">
                    Register with social platforms
                </p>
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

export default RegisterForm;
