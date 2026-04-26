import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import Button from "../../Design/Button";
import toast from "react-hot-toast";

const HistoryPage = () => {
    const [history, setHistory] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("history") || "[]");
        // ✅ SORT: latest first
        const sorted = stored.sort(
            (a: any, b: any) =>
                new Date(b.uploadTime).getTime() -
                new Date(a.uploadTime).getTime()
        );
        setHistory(stored);
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    // DELETE FUNCTION
    const handleDelete = (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this record?"
        );

        if (!confirmDelete) return;

        const updated = history.filter((item) => item.id !== id);
        setHistory(updated);
        localStorage.setItem("history", JSON.stringify(updated));
        toast.success("Deleted successfully!");
    };

    // CLEAR ALL
    const handleClearAll = () => {
        const confirmClear = window.confirm(
            "This will delete all history. Do you want to continue?"
        );

        if (!confirmClear) return;

        setHistory([]);
        localStorage.removeItem("history");

        toast.success("All history cleared!");
    };
    
    return (
        <div className="p-6 min-h-screen bg-gray-50">
        <div className="flex justify-between items-center mb-6 mt-16">
            <h1 className="text-2xl font-bold mb-4">📜 Parsing History</h1>
            {history.length > 0 && (
                <div className="mb-4">
                    <Button
                        onClick={handleClearAll}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Clear All
                    </Button>
                    </div>
                )}
                </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow overflow-hidden">
                {history.length === 0 ? (
                    <p className="p-6 text-gray-500 text-center">
                        No history available
                    </p>
                ) : (
                    <table className="w-full text-sm">
                        {/* HEADER */}
                        <thead className="bg-gray-100 text-gray-600 dark:text-gray-300 text-left">
                            <tr>
                                <th className="px-6 py-3">File Name</th>
                                <th className="px-6 py-3">Size</th>
                                <th className="px-6 py-3">Uploaded</th>
                                <th className="px-6 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {history.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`border-t hover:bg-gray-50 ${
                                        index % 2 === 0
                                            ? "bg-white dark:bg-gray-900"
                                            : "bg-gray-50"
                                    }`}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100 break-all">
                                        {item.fileName}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {(item.fileSize / 1024).toFixed(2)} KB
                                    </td>

                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {formatDate(item.uploadTime)}
                                    </td>

                                     <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">
                                            {/* VIEW */}
                                        <Button
                                            onClick={() =>
                                                navigate("/result", {
                                                    state: item,
                                                })
                                            }
                                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            <Eye size={16} className="inline mr-1" /> View
                                        </Button>

                                        {/* DELETE */}
                                            <Button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="flex items-center gap-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </Button>
                                            </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;