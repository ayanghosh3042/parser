import React from "react";
import Button from "../Design/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";
import InputField from "../Design/InputField";

const RegisterForm = () => {
    const navigate = useNavigate();
    return (
        <div className="h-dvh flex flex-row-reverse linear-bg-1">
            <div className="linear-bg-2 flex flex-col justify-center-safe items-center-safe gap-5 w-1/2 rounded-tl-[250px] rounded-bl-[150px]  text-white">
                <p className="text-5xl font-extrabold">welcome Back!</p>
                <p className="text-xl">already have an account?</p>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
            <div className="flex flex-col gap-5 w-1/2 items-center justify-center ">
                <form
                    onSubmit={() => {
                        alert("Do you want to submit");
                    }}
                    className="flex flex-col min-w-sm gap-4"
                >
                    <label className="text-3xl font-bold text-white self-center">
                        Registration
                    </label>
                    <InputField type="text" placeholder="Username" />
                    <InputField type="text" placeholder="Email" />
                    <InputField
                        type="text"
                        placeholder="Password"
                        name="password"
                    />
                    <p className="self-end">forgot password?</p>
                    <Button type="submit" className="btn-2 w-full">
                        Register
                    </Button>
                </form>

                <p className="self-center-safe">
                    Register with social platforms
                </p>
                <div className="grid grid-cols-4 gap-10 px-2 max-w-sm text-5xl">
                    <FcGoogle
                        onClick={() => {
                            alert("hello continue with google");
                        }}
                    />
                    <FaLinkedin />
                    <FaGithub />
                    <FaFacebookSquare />
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
