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
                setData(mock);
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

            <div className="bg-white rounded-2xl shadow p-5 mt-4">
                {loading && <Loader />}
                {error && <ErrorState message={error} />}

                {data && fileData && (
                    <>
                        <FileInfoCard
                            fileName={fileData?.fileName}
                            fileSize={fileData?.fileSize}
                            uploadTime={fileData?.uploadTime}
                        />
                        <div className="flex justify-end mb-4">
                            <ActionButtons data={data} id={id || ""} />
                        </div>
                        <JsonViewer data={data} />
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