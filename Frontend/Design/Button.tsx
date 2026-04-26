import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  disabled?: boolean
}

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
  disabled,
}: ButtonProps) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-medium transition duration-200";

  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;