import React from "react";

const ErrorState = ({ message }: { message: string }) => {
    return (
        <div className="text-center text-red-500 py-10">
            {message}
        </div>
    );
};

export default ErrorState;