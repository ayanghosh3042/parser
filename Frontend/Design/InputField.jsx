import React from "react";

const InputField = ({ ...props }) => {
    return (
        <input
            {...props}
            className="bg-gray-300 h-15 px-4 rounded-2xl text-xl"
        />
    );
};

export default InputField;
