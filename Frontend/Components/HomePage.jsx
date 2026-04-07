import React, { useState, useEffect } from "react";
import Button from "../Design/Button";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const HomePage = () => {
    const [dragActive, setDragActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const loggedIn = localStorage.getItem("userLoggedIn");
        const email = localStorage.getItem("userEmail");
        if (loggedIn === "true") {
            setIsLoggedIn(true);
            setUserEmail(email || "");
        }
    }, []);
    // Listen for storage changes to update login state across tabs
    useEffect(() => {
        const handleStorageChange = () => {
            const loggedIn = localStorage.getItem("userLoggedIn");
            const email = localStorage.getItem("userEmail");
            if (loggedIn === "true") {
                setIsLoggedIn(true);
                setUserEmail(email || "");
            } else {
                setIsLoggedIn(false);
                setUserEmail("");
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Clear local storage
            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("userEmail");
            setIsLoggedIn(false);
            setUserEmail("");
            alert("✅ Logged out successfully!");
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Handle file upload logic here
            console.log("Files dropped:", e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            // Handle file upload logic here
            console.log("Files selected:", e.target.files);
        }
    };

    return (
        <div className="flex">
    {/* SIDEBAR */}
    <Sidebar />

    {/* MAIN CONTENT */}
    <div className="flex-1 min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Document Parser
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Transform your documents into structured data with
                        AI-powered parsing. Upload, analyze, and extract
                        valuable information instantly.
                    </p>
                </div>

                {/* Upload Section */}
                <div className="max-w-4xl mx-auto">
                    <div
                        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                            dragActive
                                ? "border-white bg-white/10 scale-105"
                                : "border-blue-200 bg-white/5 hover:bg-white/10"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileSelect}
                            accept=".pdf,.doc,.docx,.txt,.csv,.json"
                            multiple
                        />

                        <div className="space-y-6">
                            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    Drop your documents here
                                </h3>
                                <p className="text-blue-100 mb-6">
                                    or click to browse files
                                </p>

                                <Button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
                                    Choose Files
                                </Button>
                            </div>

                            <p className="text-sm text-blue-200">
                                Supported formats: PDF, DOC, DOCX, TXT, CSV,
                                JSON (Max 10MB per file)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-blue-400 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Smart Text Extraction
                        </h3>
                        <p className="text-blue-100">
                            Advanced OCR and AI algorithms extract text and data
                            from any document format with high accuracy.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-purple-400 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Batch Processing
                        </h3>
                        <p className="text-blue-100">
                            Process multiple documents simultaneously to save
                            time and increase productivity.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-teal-400 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Export Options
                        </h3>
                        <p className="text-blue-100">
                            Export parsed data in various formats: JSON, CSV,
                            Excel, or structured text files.
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-20 text-center">
                    {isLoggedIn ? (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Welcome back, {userEmail}!
                            </h2>
                            <p className="text-blue-100 mb-8">
                                You're ready to start parsing your documents
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                                    Start Parsing
                                </Button>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                                    View History
                                </Button>
                                <Button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200">
                                    Documentation
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-8">
                                Login to Continue
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    onClick={() => navigate("/login")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => navigate("/register")}
                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                                >
                                    Sign Up
                                </Button>
                                <Button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200">
                                    Documentation
                                </Button>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                                    API Access
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default HomePage;
