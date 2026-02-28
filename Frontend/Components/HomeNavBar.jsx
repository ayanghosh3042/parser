import React from "react";
import Button from "../Design/Button";
import { useNavigate } from "react-router-dom";

const HomeNavBar = ({ isLoggedIn = false, userEmail = "", onLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-indigo-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">
                            DocParser
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                        >
                            Features
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                        >
                            Pricing
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                        >
                            Docs
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <span className="text-white text-sm hidden sm:block">
                                    {userEmail}
                                </span>
                                <Button
                                    onClick={onLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => navigate("/register")}
                                    className="text-white hover:text-blue-200 transition-colors duration-200 hidden sm:block"
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    onClick={() => navigate("/login")}
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-white hover:text-blue-200 transition-colors duration-200">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HomeNavBar;
