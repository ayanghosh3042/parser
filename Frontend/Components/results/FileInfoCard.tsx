import React from "react";

interface FileInfoProps {
    fileName: string;
    fileSize: number; // in bytes
    uploadTime: string; // ISO string or readable
}

// Helper: format file size
const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 🕒 Helper: format date
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const FileInfoCard: React.FC<FileInfoProps> = ({
    fileName,
    fileSize,
    uploadTime,
}) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-5 mb-4 border">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                File Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {/* File Name */}
                <div>
                    <p className="text-lg text-gray-500">File Name</p>
                    <p className="text-base font-medium text-gray-800 dark:text-gray-100 break-all">
                        {fileName}
                    </p>
                </div>

                {/* File Size */}
                <div>
                    <p className="text-lg text-gray-500">Size</p>
                    <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                        {formatFileSize(fileSize)}
                    </p>
                </div>

                {/* Upload Time */}
                <div>
                    <p className="text-lg text-gray-500">Uploaded</p>
                    <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                        {formatDate(uploadTime)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FileInfoCard;