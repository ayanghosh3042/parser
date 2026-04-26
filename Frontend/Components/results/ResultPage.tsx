import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ResultHeader from "./ResultHeader"
import JsonViewer from "./JsonViewer";
import ActionButtons from "./ActionButtons";
import Loader from "./Loader";
import ErrorState from "./ErrorState";
import FileInfoCard from "./FileInfoCard";
import { ArrowLeft } from "lucide-react";
import Button from "../../Design/Button";

const ResultPage: React.FC = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [brailleData, setBrailleData] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"json" | "braille">("json");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const fileData = location.state;
    // 🔹 MOCK DATA (replace later with API)
    useEffect(() => {
        setTimeout(() => {
            try {
                const mock = {
                    name: "John Doe",
                    email: "john@example.com",
                    skills: ["React", "Python"],
                    experience: {
                        company: "XYZ Corp",
                        years: 2,
                    },
                };
                // 🔹 Mock Braille Output
                const mockBraille = `
⠚⠕⠓⠝ ⠙⠕⠑
⠑⠍⠁⠊⠇: john@example.com
⠎⠅⠊⠇⠇⠎: React, Python
⠑⠭⠏⠑⠗⠊⠑⠝⠉⠑: XYZ Corp (2 years)
                `;
                setData(mock);
                setBrailleData(mockBraille);
                setLoading(false);
            } catch (err) {
                setError("Failed to load data");
                setLoading(false);
            }
        }, 1000);
    }, []);

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <ResultHeader id={id || ""} />

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-5 mt-4">
                {loading && <Loader />}
                {error && <ErrorState message={error} />}

                {data && fileData && (
                    <>
                        <FileInfoCard
                            fileName={fileData?.fileName}
                            fileSize={fileData?.fileSize}
                            uploadTime={fileData?.uploadTime}
                        />
                        <div className="flex justify-between items-center mb-4">
                            {/* 🔹 Tabs */}
                            <div className="flex gap-2 cursor">
                                <Button
                                    onClick={() => setActiveTab("json")}
                                    className={` cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === "json"
                                            ? "bg-blue-600 text-white shadow"
                                            : "!bg-gray-200 !text-gray-700 dark:bg-gray-700 dark:text-gray-300 !hover:bg-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                >
                                    JSON Output
                                </Button>
                                <Button
                                    onClick={() => setActiveTab("braille")}
                                    className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === "braille"
                                            ? "bg-blue-600 text-white shadow"
                                            : "!bg-gray-200 !text-gray-700 dark:bg-gray-700 dark:text-gray-300 !hover:bg-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                >
                                    Braille Output
                                </Button>
                            </div>
                            <ActionButtons data={data} id={id || ""} />

                        </div>
                        {/* 🔹 Conditional Rendering */}
                        {activeTab === "json" ? (
                            <JsonViewer data={data} />
                        ) : (
                            <div className="bg-gray-900 text-white p-4 rounded-lg font-mono whitespace-pre-wrap text-sm overflow-auto border border-gray-700">
                                {brailleData}
                            </div>
                        )}
                        <div className="flex justify-start mt-6">
                            <Button
                                variant="outline"
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <ArrowLeft size={16} />
                                Previous
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultPage;