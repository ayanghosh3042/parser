import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import Button from "../Design/Button";
import { Link, useNavigate } from "react-router";
import InputField from "../Design/InputField";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!formData.email || !formData.password) {
            alert("❌ Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Include cookies
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Response:", data);

            if (res.ok) {
                alert("✅ Login successful!");
                // Store user info in localStorage if needed
                localStorage.setItem("userLoggedIn", "true");
                localStorage.setItem("userEmail", formData.email);
                navigate("/"); // Navigate to home page after successful login
            } else {
                alert("❌ " + data.message);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };
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
                    onSubmit={handleSubmit}
                    className="flex flex-col min-w-sm gap-4"
                >
                    <label className="text-3xl font-bold self-center">
                        Login
                    </label>
                    <InputField
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <p className="self-end cursor-pointer hover:text-blue-600 transition-colors">
                        Forgot password?
                    </p>
                    <Button
                        type="submit"
                        className={`btn-2 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
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
