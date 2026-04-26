import React from "react";

const ResultHeader = ({ id }: { id: string }) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold font-sans (Inter) text-gray-800 dark:text-gray-100  mt-15">
                    Parsed Result
                </h1>
            </div>
        </div>
    );
};

export default ResultHeader;