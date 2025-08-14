const Button = ({ children, onClick, type = "button", className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
