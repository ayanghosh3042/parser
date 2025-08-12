const Button = ({ children, onClick, type = "button", className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`border-2 border-white text-white hover:bg-blue-500/50 rounded-sm py-2 px-10 w-fit ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
