import InputField from "../Design/InputField";
import PasswordField from "../Design/PasswordField";
import AuthLayout from "../Design/AuthLayout";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import ValidatePassword, { Confirm } from "../Logic/CheckPassword";
import toast from "react-hot-toast";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const { password, setPassword, showPassword, setShowPassword, allValid }
  = usePasswordValidation();

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
    });

    const [validatePasswordMessage, setValidatePasswordMessage] =
        useState<string>("");
    const [isConfirm, setIsConfirm] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setValidatePasswordMessage(ValidatePassword(password));

        setFormData(prev => ({ ...prev, password }));

        if (errors.password) {
            setErrors(prev => ({ ...prev, password: "" }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Required field validation
    if (
        !formData.email.trim() ||
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !password.trim()
    ) {
        toast.error("Please fill all mandatory fields");
        return;
    }

    // password rules validation
    if (!allValid) {
        toast.error("Password does not meet requirements");
        return;
    }

        if (!agreeTerms || !agreePrivacy) {
            toast.error("Please accept Terms & Privacy Policy");
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Registration successful! Please Login.");
                navigate("/login");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
  formData.email &&
  formData.firstName &&
  formData.lastName &&
  password &&
  allValid &&
  agreeTerms &&
  agreePrivacy;

   return (
  <AuthLayout>
    <div className="w-1/3 min-w-[360px] flex flex-col bg-white shadow-lg px-7 pt-7">
      <h1 className="text-4xl font-bold text-gray-700">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-xs mx-auto mt-7"
      >
        <InputField
          label="Email*"
          name="email"
          type="email"
          placeholder="john@gmail.com"
          onChange={handleChange}
        />

        <InputField
          label="First Name*"
          name="firstName"
          placeholder="John"
          onChange={handleChange}
        />

        <InputField
          label="Last Name*"
          name="lastName"
          placeholder="Doe"
          onChange={handleChange}
        />

        <InputField
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="1234567890"
          onChange={handleChange}
        />

        <PasswordField
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChange={handlePassword}
          allValid={allValid}
        />

        {/* Terms */}
        <div className="flex items-start space-x-2 mt-4">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1"
          />
          <label className="text-sm text-gray-700">
            I agree to the{" "}
            <span className="text-blue-500">
              <a href="/terms-and-conditions" target="_blank">
                Terms & Conditions
              </a>
            </span>
          </label>
        </div>

        {/* Privacy */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)}
            className="mt-1"
          />
          <label className="text-sm text-gray-700">
            I agree to the{" "}
            <span className="text-blue-500">
              <a href="/privacy-policy" target="_blank">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 text-white font-bold rounded-lg
          ${
            !isFormValid
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-bold"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  </AuthLayout>
);
};

export default RegisterForm;