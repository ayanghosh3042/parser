import React, { useState, useEffect } from "react";
import Button from "../Design/Button";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast } from "react-hot-toast";

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
        } finally {
            // Clear local storage
            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("userEmail");
            setIsLoggedIn(false);
            setUserEmail("");
            toast.success("✅ Logged out successfully!");
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
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            // Handle file upload logic here
        }
    };

    return (
        <div className="flex">

    {/* MAIN CONTENT */}
    <div className="flex-1 min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">

            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-12 pb-16">
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
                </div>
            </div>
        </div>
    );
};

export default HomePage;