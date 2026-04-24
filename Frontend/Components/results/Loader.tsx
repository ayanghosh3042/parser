import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 animate-pulse">
                Parsing document...
            </p>
        </div>
    );
};

export default Loader;