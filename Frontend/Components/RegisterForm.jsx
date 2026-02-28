import { useState } from "react";
import Button from "../Design/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";
import InputField from "../Design/InputField";
import ValidatePassword, { Confirm } from "../Logic/CheckPassword";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [validatePasswordMessage, setValidatePasswordMessage] = useState("");
    const [isConfirm, setIsConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear specific field error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const handlePassword = (e) => {
        const password = e.target.value;
        setValidatePasswordMessage(ValidatePassword(password));
        setFormData({ ...formData, password: password });

        // Clear password error when user starts typing
        if (errors.password) {
            setErrors({
                ...errors,
                password: "",
            });
        }
    };

    const handlePasswordConfirm = (e) => {
        const confirmPassword = e.target.value;
        const isSame = Confirm(confirmPassword, formData.password);
        setIsConfirm(isSame);
        setFormData({ ...formData, confirm_password: confirmPassword });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email format is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (validatePasswordMessage !== "") {
            newErrors.password = validatePasswordMessage;
        }

        if (!formData.confirm_password) {
            newErrors.confirm_password = "Please confirm your password";
        } else if (isConfirm === false) {
            newErrors.confirm_password = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Validate form
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        try {
            const { confirm_password, ...submitData } = formData;

            const res = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(submitData),
            });

            const data = await res.json();
            console.log("Response:", data);

            if (res.ok) {
                alert(
                    "✅ Registration successful! Please login with your credentials.",
                );
                navigate("/login");
            } else {
                alert("❌ " + data.message);
                if (data.message.includes("already exist")) {
                    setErrors({ email: "User with this email already exists" });
                }
            }
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-dvh flex flex-row-reverse linear-bg-1">
            <div className="linear-bg-2 flex flex-col justify-center-safe items-center-safe gap-5 w-1/2 rounded-tl-[250px] rounded-bl-[150px]  text-white">
                <p className="text-5xl font-extrabold">Welcome Back!</p>
                <p className="text-xl">Already have an account?</p>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
            <div className="flex flex-col gap-5 w-1/2 items-center justify-center ">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col min-w-sm gap-4"
                >
                    <label className="text-3xl font-bold text-white self-center">
                        Registration
                    </label>

                    <div className="flex flex-col gap-1">
                        <InputField
                            onChange={handleChange}
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={formData.name}
                            required
                            className={
                                errors.name ? "border-2 border-red-500" : ""
                            }
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm px-2">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputField
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            required
                            className={
                                errors.email ? "border-2 border-red-500" : ""
                            }
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm px-2">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputField
                            onChange={handlePassword}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            required
                            className={
                                errors.password || validatePasswordMessage
                                    ? "border-2 border-red-500"
                                    : ""
                            }
                        />
                        {validatePasswordMessage &&
                            validatePasswordMessage !== "" && (
                                <div className="py-2 bg-red-500 px-4 rounded-md text-sm text-white">
                                    {validatePasswordMessage}
                                </div>
                            )}
                        {errors.password && (
                            <span className="text-red-500 text-sm px-2">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputField
                            onChange={handlePasswordConfirm}
                            type="password"
                            onFocus={() => {
                                isConfirm === null ? setIsConfirm(false) : null;
                            }}
                            placeholder="Confirm Password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            required
                            className={
                                (!isConfirm && isConfirm !== null) ||
                                errors.confirm_password
                                    ? "border-2 border-red-500"
                                    : ""
                            }
                        />
                        {isConfirm === false && (
                            <div className="py-2 bg-red-500 px-4 rounded-md text-sm text-white">
                                Passwords do not match
                            </div>
                        )}
                        {errors.confirm_password && (
                            <span className="text-red-500 text-sm px-2">
                                {errors.confirm_password}
                            </span>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className={`btn-2 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </Button>
                </form>

                <p className="self-center-safe text-white">
                    Register with social platforms
                </p>
                <div className="grid grid-cols-4 gap-10 px-2 max-w-sm text-5xl">
                    <FcGoogle
                        onClick={() => {
                            alert("Continue with Google - Coming Soon!");
                        }}
                        className="cursor-pointer hover:scale-110 transition-transform"
                    />
                    <FaLinkedin className="cursor-pointer hover:scale-110 transition-transform text-blue-600" />
                    <FaGithub className="cursor-pointer hover:scale-110 transition-transform text-gray-800" />
                    <FaFacebookSquare className="cursor-pointer hover:scale-110 transition-transform text-blue-800" />
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
