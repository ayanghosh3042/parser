import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../Design/AuthLayout";
import InputField from "../Design/InputField";
import toast from "react-hot-toast";

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        captcha: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors(prev => ({
            ...prev,
            [e.target.name]: ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill all fields");
            return;
        }

        if (formData.captcha !== generatedCaptcha) {
            toast.error("Invalid captcha");
            generateCaptcha(); // regenerate after wrong attempt
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Login successful!");
                navigate("/home");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            
        } finally {
            setLoading(false);
        }
    };

    const [generatedCaptcha, setGeneratedCaptcha] = useState("");
    const generateCaptcha = () => {
        const chars =
            "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz1234567890";
        let captcha = "";

        for (let i = 0; i < 5; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setGeneratedCaptcha(captcha);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        captcha: "",
    });

    const validateForm = () => {
        let newErrors = {
            email: "",
            password: "",
            captcha: "",
        };

        let isValid = true;

        if (!formData.email) {
            newErrors.email = "Please provide a valid email address";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please provide a valid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Please enter a password";
            isValid = false;
        }

        if (!formData.captcha) {
            newErrors.captcha = "Please enter captcha";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <AuthLayout>
            <div className="w-1/3 min-w-[360px] flex flex-col bg-white shadow-lg px-7 pt-7">
                <div className="w-full">
                    <h1 className="text-3xl font-semibold tracking-tighter leading-none text-black">Log in</h1>
                    <p className="mt-2 text-base text-black">
                        Welcome back! Please enter your details.
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="w-full"
                >
                    {/* EMAIL */}
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}

                    {/* PASSWORD */}
                    <div className="mt-5">
                        <label className="text-gray-600 text-base font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                className="w-full h-10 rounded-md px-3 bg-white text-gray-700 border border-gray-300 focus:outline-none"
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 py-1 text-black"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* CAPTCHA */}
                    <div className="mt-5">
                        <label className="text-gray-600 text-base font-medium">
                            Recaptcha Text
                        </label>

                        <div className="border border-gray-300 p-2 rounded-md flex items-center justify-between">
                            <span className="tracking-widest font-mono select-none">
                                {generatedCaptcha}
                            </span>

                            <button
                                type="button"
                                onClick={generateCaptcha}
                                className="text-gray-600 ml-4"
                            >
                                ↻
                            </button>
                        </div>

                        <input
                            type="text"
                            name="captcha"
                            placeholder="Enter captcha text"
                            autoComplete="off"
                            className="w-full mt-2 h-10 rounded-md px-3 border border-gray-300"
                            onChange={handleChange}
                        />
                    </div>
                    {errors.captcha && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.captcha}
                        </p>
                    )}

                    {/* REMEMBER + FORGOT */}
                    <div className="flex gap-10 justify-between items-center mt-6 w-full">
                        <div className="flex items-center space-x-2">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="rememberMe" className="text-gray-600 text-sm">
                                Remember me for 15 days
                            </label>
                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-sm text-purple-600 hover:underline font-bold"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 cursor-pointer"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>

                    {/* REGISTER LINK */}
                    <div className="pt-4">
                        <p className="text-sm text-center text-gray-600 bottom-0 align-text-bottom">
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-purple-600 hover:underline font-bold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default LoginForm;