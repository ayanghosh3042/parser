import React, { useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router";
import Sidebar from "../Components/Sidebar";
import Logo from "./Logo";
import { Outlet } from "react-router";
interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState<boolean>(true); // default collapsed

    useEffect(() => {
        if (location.pathname === "/home") {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }, [location.pathname]);

    const showHeaderLogo = collapsed;

    return (
        <div className="flex">
            {/* SIDEBAR */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* SCROLLABLE CONTENT */}
            <div
                className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"
                    }`}
            >

                {/* FLOATING LOGO (no space taken) */}
                {showHeaderLogo && (
                    <div
                        className={`absolute top-4 z-50 transition-all duration-300 ${collapsed ? "left-20" : "left-72"
                            }`}
                    >
                        <Logo
                            textClass="text-gray-900"
                            iconBgClass="bg-indigo-100"
                        />
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;