import React from "react";

const InputField = ({ className, ...props }) => {
    return (
        <input
            {...props}
            className={`bg-gray-300 h-15 px-4 rounded-2xl text-xl focus:outline-0 focus:ring-2 focus:ring-green-400 ${className}`}
        />
    );
};

export default InputField;
